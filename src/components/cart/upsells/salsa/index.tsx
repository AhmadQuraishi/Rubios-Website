import { Grid, Typography, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMultipleProductsRequest } from '../../../../redux/actions/basket/addMultipleProducts';
import {changeImageSize} from "../../../../helpers/common";

const useStyles = makeStyles((theme: Theme) => ({
  cartTitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '25px !important',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold !important',
    padding: '10px 0px 18px 0px',
  }
}));

const Salsa = ({ upsellsType }: any) => {
  const classes = useStyles();
  const [products, setProducts] = useState<any>();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { categories } = useSelector((state: any) => state.categoryReducer);
  const { upsells } = useSelector((state: any) => state.getUpsellsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (upsells && upsells.length) {
      let prod: any = [];

      let upsellsCategory: any = upsells.find(
        (obj: any) => obj.type === upsellsType,
      );
      if (upsellsCategory && upsellsCategory.products) {
        prod = upsellsCategory.products;
      }

      if (prod && prod.length) {
        prod = prod.map((obj: any) => {
          return {
            ...obj,
            quantity: 0,
          };
        });
      }

      setProducts(prod);

      setTimeout(() => {
        fitContainer();
      }, 500);
    }
  }, [upsells]);

  const submit = () => {
    if (products && products.length) {
      const finalProducts: any = [];
      products.forEach((product: any) => {
        if (product.quantity > 0) {
          const obj = {
            productid: product.id,
            quantity: product.quantity,
            choices: [],
          };
          finalProducts.push(obj);
        }
      });
      if (finalProducts.length) {
        const payload: any = {
          products: finalProducts,
        };
        setButtonDisabled(true);
        dispatch(addMultipleProductsRequest(basketObj.basket.id, payload));
      }
    }
  };

  const showErrorMsg = (
    obj: any,
    basketCount: any,
    count: any,
    type: string,
  ) => {
    if (
      parseInt(obj.maximumbasketquantity || 0) === basketCount &&
      type === 'PLUS'
    ) {
      setErrorMsg(
        `You may only order upto ${obj.maximumbasketquantity || 0} ${
          obj.name ? obj.name : ''
        }`,
      );
    } else if (
      obj.quantity + 1 > parseInt(obj.maximumquantity || 0) &&
      type === 'PLUS'
    ) {
      setErrorMsg(
        `You may only add upto ${obj.maximumquantity || 0} ${
          obj.name ? obj.name : ''
        } at a time.`,
      );
    } else if (count !== obj.quantity) {
      setErrorMsg('');
    }
  };

  const updateSalsaCount = (id: number, type: string) => {
    let basketCount = 0;
    if (
      basketObj &&
      basketObj.basket &&
      basketObj.basket.products &&
      basketObj.basket.products.length
    ) {
      const filterProduct = basketObj.basket.products.filter(
        (obj: any) => obj.productId === id,
      );
      if (filterProduct && filterProduct.length) {
        filterProduct.forEach((prod: any) => {
          basketCount += prod.quantity;
        });
      }
    }
    const updatedProducts = products.map((obj: any) => {
      if (obj.id === id) {
        let limit = parseInt(obj.maximumbasketquantity || 0) - basketCount;
        let count = type === 'PLUS' ? obj.quantity + 1 : obj.quantity - 1;
        count =
          count >= parseInt(obj.maximumquantity || 0)
            ? parseInt(obj.maximumquantity || 0)
            : count <= 0
            ? 0
            : count;

        showErrorMsg(obj, basketCount, count, type);

        if (count <= limit) {
          return {
            ...obj,
            quantity: count,
          };
        } else {
          return {
            ...obj,
          };
        }
      } else {
        return {
          ...obj,
        };
      }
    });
    setProducts(updatedProducts);
    fitContainer();
  };

  const fitContainer = () => {
    const elem = document.getElementById('cart-main-container-upsells');
    const cartBox = document.getElementById('cart-box-upsells');
    if (elem && cartBox) {
      if (
        basketObj &&
        basketObj.basket &&
        basketObj.basket.products.length > 0
      ) {
        elem.style.height = cartBox?.clientHeight - 220 + 'px';
      } else {
        elem.style.height = cartBox?.clientHeight - 150 + 'px';
      }
      elem.style.overflow = 'auto';
    }
  };
  window.addEventListener(
    'orientationchange',
    function () {
      fitContainer();
    },
    false,
  );

  window.addEventListener(
    'resize',
    function () {
      fitContainer();
    },
    false,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fitContainer();
  }, []);

  const checkQuantity = () => {
    let total = 0;
    if (products && products.length) {
      total = products.reduce(function (previousValue: any, currentValue: any) {
        return previousValue + currentValue.quantity;
      }, 0);
    }

    return total === 0;
  };

  return (
    <>
      {basketObj &&
        basketObj.basket &&
        basketObj.basket.products.length > 0 &&
        products &&
        products.length > 0 && (
          <Grid
            container
            spacing={1}
            id="cart-main-container-upsells"
            sx={{ paddingRight: '25px' }}
          >
            {products.map((obj: any) => {
              return (
                <>
                  <Grid item xs={12} lg={6}>
                    <Grid
                      key={Math.random() + '-'}
                      item
                      xs={12}
                      style={{
                        display: 'flex',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        padding: 10,
                        minHeight: '140px',
                        alignItems: 'center',
                        boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',
                      }}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {}}
                      // tabIndex={0}
                      // onKeyUp={(e) => {
                      //   if (e.keyCode === 13) {
                      //     addUpsells(option.id);
                      //   }
                      // }}
                    >
                      <Grid item xs={6}>
                        <img
                          style={{
                            width: '85%',
                          }}
                          src={
                            ((categories && categories.imagepath) || '') +
                            changeImageSize(
                              obj.imagefilename || '',
                              obj.images || '',
                              'desktop-menu'
                            )
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '40px',
                          paddingLeft: '10px',
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="p"
                          fontSize="14px !important"
                          padding={0}
                          textAlign="left"
                          lineHeight="1.2 !important"
                          textTransform="capitalize"
                          className={classes.cartTitle}
                          sx={{
                            display: 'inline',
                            fontFamily: 'Poppins-Medium !important',
                          }}
                          // title={option.name}
                        >
                          {obj.name}
                        </Typography>
                        <div
                          style={{ display: 'flex', alignItems: 'center' }}
                          className="upsells-details"
                        >
                          <label
                            title="Quantity"
                            className="label bold quantity-label"
                            // htmlFor="quantityfield"
                          >
                            QTY
                          </label>
                          <div className="quantity">
                            <Button
                              title=""
                              className="add"
                              aria-label="increase"
                              onClick={() => {
                                updateSalsaCount(obj.id, 'PLUS');
                              }}
                            >
                              {' '}
                              +{' '}
                            </Button>
                            <input
                              value={obj.quantity}
                              // inputProps={inputProps}
                              readOnly
                              id="quantityfield"
                              onChange={() => {}}
                              className="input-quantity"
                              title="quantity"
                            />
                            <Button
                              title=""
                              className="subtract"
                              aria-label="reduce"
                              onClick={() => {
                                updateSalsaCount(obj.id, 'MINUS');
                              }}
                            >
                              {' '}
                              -{' '}
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Grid>
        )}
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            minHeight: '45px',
          }}
        >
          {errorMsg && errorMsg !== '' && (
            <Typography
              variant="h6"
              component="p"
              fontSize="14px !important"
              padding="12px 30px 6px 15px"
              color="red"
              textAlign="right"
              lineHeight="1.2 !important"
              textTransform="capitalize"
              className={classes.cartTitle}
              sx={{
                display: 'inline',
                fontFamily: 'Poppins-Medium !important',
              }}
              title="Maximum number of Salsa have been selected"
            >
              {errorMsg}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 &&
            products &&
            products.length > 0 && (
              <Grid
                item
                xs={12}
                lg={6}
                md={6}
                style={{
                  paddingRight: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '15px',
                }}
              >
                <Button
                  variant="contained"
                  disabled={
                    checkQuantity() || (basketObj.loading && buttonDisabled)
                  }
                  onClick={() => {
                    submit();
                  }}
                  sx={{
                    textTransform: 'uppercase',
                    backgroundColor: '#0A6FB8',
                    margin: 'auto',
                    width: '100%',
                    borderRadius: 0,
                    padding: '30px 10px',
                    fontSize: '16px',
                    fontFamily: "'Poppins-Medium', sans-serif !important;",
                  }}
                  title="Checkout"
                  aria-label="Checkout"
                >
                  ADD TO BAG
                </Button>
              </Grid>
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default Salsa;
