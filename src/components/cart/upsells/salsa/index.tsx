import { Grid, Typography, Theme, Button, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMultipleProductsRequest } from '../../../../redux/actions/basket/addMultipleProducts';
import { changeImageSize, isEmpty } from '../../../../helpers/common';
import SalsaSkeletonUI from '../../../salsa-skeleton-ui';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  cartTitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '25px !important',
    fontWeight: '700',
    fontFamily: "'sunbornsans_one' !important",
    padding: '10px 0px 18px 0px',
  },
}));

const Salsa = ({ upsellsType, setErrorMsg }: any) => {
  const classes = useStyles();
  const [products, setProducts] = useState<any>();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [optionSelected, setOptionSelected] = useState<any>(null);
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
        const options: any = {};
        prod = prod.map((obj: any) => {
          const updatedProd = {
            ...obj,
            quantity: 0,
          };
          if (updatedProd?.options?.length > 0) {
            if (updatedProd?.mandatory === false) {
              const newOption = {
                adjustsparentcalories: false,
                adjustsparentprice: false,
                availability: {
                  always: true,
                  description: null,
                  enddate: null,
                  isdisabled: false,
                  now: true,
                  startdate: null,
                },
                basecalories: null,
                caloriesseparator: null,
                chainoptionid: moment().unix() + 1500,
                children: false,
                cost: 0,
                costoverridelabel: null,
                displayid: null,
                fields: null,
                id: 55555555555,
                isdefault: false,
                maxcalories: null,
                menuitemlabels: [],
                metadata: null,
                modifiers: null,
                name: 'As is',
              };
              updatedProd.options.unshift(newOption);
            }

            options[`${updatedProd.id}`] = `${updatedProd.options[0].id}`;
          }
          return updatedProd;
        });
        setOptionSelected(options);
      }
      setProducts(prod);
      setTimeout(() => {
        fitContainer();
      }, 500);
    }
  }, [upsells, upsellsType]);

  const submit = () => {
    if (products && products.length) {
      const finalProducts: any = [];
      products.forEach((product: any) => {
        if (product.quantity > 0) {
          let choices: any = [];
          if (
            optionSelected[product.id] &&
            optionSelected[product.id] !== '55555555555'
          ) {
            choices = [
              {
                choiceid: optionSelected[product.id],
              },
            ];
          }
          const obj = {
            productid: product.id,
            quantity: product.quantity,
            choices: choices,
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
    maximumBasketQuantity: any,
    maximumQuantity: any,
  ) => {
    if (
      maximumBasketQuantity !== -1 &&
      maximumBasketQuantity === basketCount &&
      type === 'PLUS'
    ) {
      setErrorMsg(
        `You may only order upto ${maximumBasketQuantity} ${
          obj.name ? obj.name : ''
        }`,
      );
    } else if (
      maximumQuantity !== -1 &&
      obj.quantity + 1 > maximumQuantity &&
      type === 'PLUS'
    ) {
      setErrorMsg(
        `You may only add upto ${maximumQuantity} ${
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
        const maximumBasketQuantity = isEmpty(obj.maximumbasketquantity)
          ? -1
          : parseInt(obj.maximumbasketquantity);
        const maximumQuantity = isEmpty(obj.maximumquantity)
          ? -1
          : parseInt(obj.maximumquantity);
        let limit = maximumBasketQuantity - basketCount;
        let count =
          type === 'PLUS'
            ? obj.quantity + 1
            : obj.quantity === 0
            ? 0
            : obj.quantity - 1;

        count =
          maximumQuantity === -1 || maximumBasketQuantity === -1
            ? count
            : count >= maximumQuantity
            ? maximumQuantity
            : count >= maximumBasketQuantity
            ? maximumBasketQuantity
            : count <= 0
            ? 0
            : count;

        // count =
        //   count >= parseInt(obj.maximumquantity || 0)
        //     ? parseInt(obj.maximumquantity || 0)
        //     : count <= 0
        //     ? 0
        //     : count;

        showErrorMsg(
          obj,
          basketCount,
          count,
          type,
          maximumBasketQuantity,
          maximumQuantity,
        );

        if (count <= limit || limit < 0) {
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

  const optionChange = (e: any, id: any) => {
    setOptionSelected({ ...optionSelected, [id]: e.target.value });
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
        elem.style.height = cartBox?.clientHeight - 175 + 'px';
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
  useEffect(() => {
    // const focusableElements =
    //   'button, [href], input, ul , li ,  select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#cart-salsa'); // select the modal by it's id
    if (modal) {
      const focusableContent = modal.querySelectorAll('[tabindex="0"]');
      const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal

      const lastFocusableElement =
        focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

      document.addEventListener('keydown', function (e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) {
          // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            // add focus for the last focusable element
            lastFocusableElement &&
              (lastFocusableElement as HTMLElement)?.focus();
            e.preventDefault();
          }
        } else {
          // if tab key is pressed
          if (document.activeElement === lastFocusableElement) {
            // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement &&
              (firstFocusableElement as HTMLElement)?.focus(); // add focus for the first focusable element
            e.preventDefault();
          }
        }
      });

      firstFocusableElement && (firstFocusableElement as HTMLElement)?.focus();
    }
  }, []);

  return (
    <>
      {products?.length < 1 && <SalsaSkeletonUI />}
      {basketObj &&
        basketObj.basket &&
        basketObj.basket.products.length > 0 &&
        products &&
        products.length > 0 && (
          <Grid
            container
            spacing={1}
            id="cart-main-container-upsells"
            sx={{
              paddingRight: '25px',
              alignContent: 'flex-start',
              alignItems: 'stretch',
            }}
          >
            {products.map((obj: any) => {
              return (
                <>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    id="cart-salsa"
                    sx={{ display: 'flex', alignItems: 'stretch' }}
                  >
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
                      tabIndex={0}
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
                              'desktop-menu',
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
                          gap: {
                            lg: '60px',
                            xs: '40px',
                            md: '40px',
                            sm: '40px',
                          },
                          alignSelf: {
                            lg: 'flex-end',
                            md: 'center',
                            sm: 'center',
                            xs: 'center',
                          },
                          paddingLeft: '10px',
                          maxWidth: 'inherit',
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="p"
                          fontSize="12px !important"
                          padding={0}
                          textAlign="left"
                          lineHeight="1.2 !important"
                          textTransform="capitalize"
                          className={classes.cartTitle}
                          sx={{
                            display: 'inline',
                            fontFamily: "'Libre Franklin' !important",
                            fontWeight: "bold",
                            fontSize: {
                              lg: '12px !important',
                              xs: '14px !important',
                            },
                          }}
                          // title={option.name}
                        >
                          {
                            (obj.name =
                              obj.name.length > 26
                                ? obj.name.slice(0, 30) + '...'
                                : obj.name)
                          }
                          {obj.cost > 0 && (
                            <Grid
                              item
                              xs={12}
                              title={`$${parseFloat(obj.cost).toFixed(2)}`}
                              sx={{
                                paddingTop: '5px',
                                fontSize: '14px',
                                fontFamily: "'Libre Franklin' !important",
                                color: '#0075BF',
                                display: 'flex',
                                alignItems: 'center',
                                // justifyContent: 'center',
                                justifyContent: { xs: 'left', md: 'left' },
                              }}
                            >
                              +$
                              {parseFloat(obj.cost).toFixed(2)}
                            </Grid>
                          )}
                          <>
                            {obj?.options?.length > 0 && (
                              <select
                                className="add-side-select"
                                // style={{
                                //   width: '100% !important',
                                //   height: '30px',
                                //   borderRadius: '5px',
                                //   border: '1px solid #ccc',
                                //   color: '#2B4B62',
                                //   padding: '5px',
                                //   textOverflow: 'ellipsis',
                                // }}
                                parent-select-option-id={obj.chainproductid}
                                onClick={(e) => e.stopPropagation()}
                                value={
                                  (optionSelected && optionSelected[obj.id]) ||
                                  ''
                                }
                                data-select-id={obj.chainproductid || '0'}
                                onChange={(e) => optionChange(e, obj.id)}
                              >
                                {obj.options.map(
                                  (option: any, index: number) => (
                                    <option
                                      key={Math.random() + index}
                                      value={`${option.id}`}
                                      // onClick={() => {
                                      //   setTotalCost(
                                      //     ((productDetails?.cost ||
                                      //         0) +
                                      //       option.cost) *
                                      //     count,
                                      //   );
                                      // }}
                                    >
                                      {option.name}
                                    </option>
                                  ),
                                )}
                              </select>
                            )}
                          </>
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
                              sx={{ marginLeft: { xs: '7px' } }}
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
                              sx={{ marginRight: { xs: '7px' } }}
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
            minHeight: '0px',
          }}
        >
          {/*{errorMsg && errorMsg !== '' && (*/}
          {/*<Typography*/}
          {/*  variant="h6"*/}
          {/*  component="p"*/}
          {/*  fontSize="14px !important"*/}
          {/*  padding="4px 30px 4px 0px"*/}
          {/*  color="red"*/}
          {/*  textAlign="left"*/}
          {/*  lineHeight="1.2 !important"*/}
          {/*  textTransform="capitalize"*/}
          {/*  className={classes.cartTitle}*/}
          {/*  sx={{*/}
          {/*    display: 'inline',*/}
          {/*    fontFamily: 'Poppins-Medium !important',*/}
          {/*    minHeight: 14,*/}
          {/*    fontSize: '12px !important',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {errorMsg}*/}
          {/*</Typography>*/}
          {/*)}*/}
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
                    fontFamily: "'grit_sansbold' !important",
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
