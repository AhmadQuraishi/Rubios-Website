import { Grid, Typography, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPSELLS } from '../../../../helpers/upsells';
import { Category, Product as ProductInfo } from '../../../../types/olo-api';
import { addMultipleProductsRequest } from '../../../../redux/actions/basket/addMultipleProducts';

const useStyles = makeStyles((theme: Theme) => ({
  dimPanel: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 400,
    width: '100%',
    height: '100vh',
    zIndex: 1101,
    [theme.breakpoints.down('xl')]: {
      display: 'block !important',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cartBox: {
    border: '1px solid #666',
    borderTop: '0',
    borderRight: '0',
    position: 'fixed',
    background: '#fff',
    top: 0,
    right: 400,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '600px',
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: 'auto !important',
    },
  },
  cartRoot: {
    position: 'relative',
    padding: '35px 5px 10px 30px',
  },
  cartTitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '25px !important',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold !important',
    padding: '10px 0px 18px 0px',
  },
  crossIcon: {
    position: 'absolute',
    top: '15px !important',
    right: '10px !important',
    display: 'flex !important',

    justifyContent: 'right !important',
    '& img': {
      cursor: 'pointer',
    },
  },
  smallLink: {
    color: '#0075BF !important',
    fontSize: '11px !important',
    fontFamily: "'Poppins-Bold' !important",
    textDecoration: 'underline',
    display: 'inline',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  disabledLink: {
    color: '#ccc !important',
    fontSize: '11px !important',
    fontFamily: 'Poppins-Bold !important',
    display: 'inline',
    cursor: 'default',
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  btnsList: {
    width: '100%',
    display: 'flex',
    listStyle: 'none',
    textDecoration: 'underline',
    height: '40px',
  },
  btn: {
    paddingLeft: '0px  !important',
    letterSpacing: 'normal !important',
  },
  emptyCart: {
    fontFamily: 'Poppins-Regular, sans-serif !Important',
    fontSize: '16px !important',
    color: '#525252',
    fontWeight: 'bold',
  },
}));

const Salsa = ({ upsellsType }: any) => {
  const classes = useStyles();
  const [upsells, setUpsells] = useState<any>();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { categories } = useSelector((state: any) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    let products: any = [];

    let upsellsCategory: any = UPSELLS.find(
      (obj: any) => obj.type === upsellsType,
    );
    console.log('upsellsCategory', upsellsCategory);
    if (upsellsCategory && upsellsCategory.products.length > 0) {
      const filteredUpsellsIds = upsellsCategory.products.map(
        (obj: any) => obj.chainproductid,
      );
      console.log('filteredUpsellsIds', filteredUpsellsIds);
      if (
        upsellsCategory &&
        categories &&
        categories.categories &&
        categories.categories.length &&
        filteredUpsellsIds.length
      ) {
        categories.categories.forEach((item: Category) => {
          const findResults = item.products
            .filter((obj: ProductInfo) => {
              return filteredUpsellsIds.includes(obj.chainproductid);
            })
            .map((obj: any) => {
              return {
                ...obj,
                quantity: 0,
              };
            });
          if (findResults && findResults.length) {
            Array.prototype.push.apply(products, findResults);
          }
        });
      }
    }
    console.log('products', products);
    console.log('basketObj', basketObj);
    // if (
    //   basketObj &&
    //   basketObj.basket &&
    //   basketObj.basket.products &&
    //   basketObj.basket.products.length
    // ) {
    //   basketObj.basket.products.forEach((prod: any) => {
    //     products = products.map((obj: any) => {
    //       if (obj.id === prod.productId) {
    //         let updateQuantity =
    //           prod.quantity - parseInt(obj.maximumbasketquantity);
    //         // 12 -3 = 9
    //         //
    //         //
    //         console.log('prod.maximumbasketquantity', obj.maximumbasketquantity)
    //         console.log('updateQuantity 1', updateQuantity)
    //         updateQuantity = updateQuantity - parseInt(obj.maximumquantity);
    //         console.log('updateQuantity 2', updateQuantity)
    //         return {
    //           ...obj,
    //           quantity: updateQuantity,
    //         };
    //       } else {
    //         let updateQuantity = obj.maximumquantity ?  parseInt(obj.maximumquantity) : 0;
    //         return {
    //           ...obj,
    //           quantity: updateQuantity
    //         };
    //       }
    //     });
    //   });
    // }
    setUpsells(products);

    setTimeout(() => {
      fitContainer();
    }, 500);
  }, [categories]);

  const submit = () => {
    console.log('upsells', upsells);
    if (upsells && upsells.length) {
      const products: any = [];
      upsells.forEach((product: any) => {
        if (product.quantity > 0) {
          const obj = {
            productid: product.id,
            quantity: product.quantity,
            choices: [],
          };
          products.push(obj);
        }
      });
      if (products.length) {
        const payload: any = {
          products: products,
        };
        setButtonDisabled(true);
        dispatch(addMultipleProductsRequest(basketObj.basket.id, payload));
      }
    }
  };

  const showErrorMsg = (
    maximumbasketquantity: any,
    maximumquantity: any,
    quantity: any,
    type: string,
  ) => {
    // if (
    //   parseInt(maximumbasketquantity || 0) === quantity &&
    //   type === 'PLUS'
    // ) {
    //   setErrorMsg('Maximum Salsa Basket Limit Reached.');
    // }
    //
    // if (
    //   parseInt(obj.maximumbasketquantity || 0) === obj.quantity &&
    //   type === 'PLUS'
    // ) {
    //   setErrorMsg('Maximum Salsa Basket Limit Reached.');
    // }

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
      console.log('filterProduct', filterProduct);
      if (filterProduct && filterProduct.length) {
        filterProduct.forEach((prod: any) => {
          basketCount += prod.quantity;
        });
      }
    }

    console.log('basketCount', basketCount);

    // basketCount = 11
    // maximumbasketquantity = 12

    // limit = 1

    // count = 1

    // count <= limit

    const updatedProducts = upsells.map((obj: any) => {
      if (obj.id === id) {
        let limit = parseInt(obj.maximumbasketquantity || 0) - basketCount;
        let count = type === 'PLUS' ? obj.quantity + 1 : obj.quantity - 1;
        count =
          count >= parseInt(obj.maximumquantity || 0)
            ? parseInt(obj.maximumquantity || 0)
            : count <= 0
            ? 0
            : count;
        console.log('limit', limit);
        console.log('count', count);

        if (
          parseInt(obj.maximumbasketquantity || 0) === basketCount &&
          type === 'PLUS'
        ) {
          console.log('workingggggggggggg')
          setErrorMsg('Maximum Salsa Basket Limit Reached.');
        }

        if (
          parseInt(obj.maximumquantity || 0) === count &&
          type === 'PLUS'
        ) {
          setErrorMsg('Maximum Salsa asdhi Basket Limit Reached.');
        }

        if (count <= limit) {
          showErrorMsg(
            obj.maximumbasketquantity,
            obj.maximumquantity,
            obj.quantity,
            type,
          );

          setErrorMsg('');
          return {
            ...obj,
            quantity: count,
          };
        } else {
          setErrorMsg('');
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

    console.log('upsells', updatedProducts);
    setUpsells(updatedProducts);
    fitContainer();
  };

  const fitContainer = () => {
    const elem = document.getElementById('cart-main-container-upsells');
    const cartBox = document.getElementById('cart-box-upsells');
    console.log('elem', elem);
    console.log('cartBox', cartBox);
    if (elem && cartBox) {
      if (
        basketObj &&
        basketObj.basket &&
        basketObj.basket.products.length > 0
      ) {
        elem.style.height = cartBox?.clientHeight - 172 + 'px';
      } else {
        elem.style.height = cartBox?.clientHeight - 100 + 'px';
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
    if (upsells && upsells.length) {
      total = upsells.reduce(function (previousValue: any, currentValue: any) {
        return previousValue + currentValue.quantity;
      }, 0);
    }

    return total === 0;
  };

  const changeImageSize = (path: string, images: any) => {
    if (images && images.length > 0) {
      const dektopImage: any = images.find(
        (obj: any) => obj.groupname === 'desktop-menu',
      );
      if (dektopImage) {
        return dektopImage.filename.replace('h=138', 'h=500');
      } else {
        return path;
      }
    } else {
      return path;
    }
  };
  return (
    <>
      {basketObj &&
        basketObj.basket &&
        basketObj.basket.products.length > 0 &&
        upsells &&
        upsells.length > 0 && (
          <Grid
            container
            spacing={1}
            id="cart-main-container-upsells"
            sx={{ paddingRight: '25px' }}
          >
            {upsells.map((obj: any) => {
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
        {errorMsg && errorMsg !== '' && (
          <Grid
            item
            xs={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography
              variant="h6"
              component="p"
              fontSize="14px !important"
              padding="0px 30px 0px 15px"
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
          </Grid>
        )}

        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 &&
            upsells &&
            upsells.length > 0 && (
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
