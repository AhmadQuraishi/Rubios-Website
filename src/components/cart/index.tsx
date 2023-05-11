import {
  Grid,
  Typography,
  Theme,
  Box,
  Checkbox,
  Divider,
  Button,
  Card,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import crossIcon from '../../assets/imgs/close.png';
import { getBasketRequest } from '../../redux/actions/basket';
import { removeProductRequest } from '../../redux/actions/basket/product/remove';
import { addProductRequest } from '../../redux/actions/basket/product/add';
import { displayToast } from '../../helpers/toast';

import { UPSELLS_TYPES } from '../../helpers/upsells';
import {
  calculateTaxAndFee,
  capitalizeFirstLetter,
  orderFees,
} from '../../helpers/common';
// import { Category, Product as ProductInfo } from '../../types/olo-api';
import {
  addUtensilsRequest,
  removeUtensilsRequest,
} from '../../redux/actions/basket/utensils';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { isLoginUser } from '../../helpers/auth';
import { getUpsellsRequest } from '../../redux/actions/basket/upsell/Get';

const useStyles = makeStyles((theme: Theme) => ({
  dimPanel: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 0,
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
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 1101,
    [theme.breakpoints.up('md')]: {
      maxWidth: '375px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '375px',
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
    fontFamily: "'Sunborn-Sansone' !important",
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
    fontFamily: "'Sunborn-Sansone' !important",
    textDecoration: 'underline !important',
    display: 'inline',
    cursor: 'pointer',
    textTransform: 'uppercase',
    padding: '0px 30px 0px 0px !important',
  },
  disabledLink: {
    color: '#ccc !important',
    fontSize: '11px !important',
    fontFamily: "'Sunborn-Sansone' !important",
    display: 'inline',
    cursor: 'default',
    textDecoration: 'underline',
    textTransform: 'uppercase',
    padding: '0px 30px 0px 0px !important',
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
    marginTop: '-5px !important',
  },
  emptyCart: {
    fontFamily: "'Librefranklin-Regular' !important",
    fontSize: '16px !important',
    color: '#525252',
    fontWeight: 'bold',
  },
  helpicon: {
    borderRadius: 20,
    width: 18,
    height: 18,
    border: '1px solid #2b4b62',
    textAlign: 'center',
    display: 'inline-flex',
    fontFamily: "'GritSans-Bold' !important",
    fontSize: 14,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));

const Cart = ({ upsellsType, showCart, handleUpsells }: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const [actionStatus, setActionStatus] = useState(false);
  const [utensils, setUtensils] = useState(false);
  const [utensilsDisabled, setUtensilsDisabled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [clickAction, setClickAction] = useState('');
  const [upsellsProductKeys, setUpsellsProductKeys] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();
  const [showMore, setShowMore] = useState(false);
  const productRemoveObj = useSelector(
    (state: any) => state.removeProductReducer,
  );
  const productAddObj = useSelector((state: any) => state.addProductReducer);
  const utensilsReducer = useSelector((state: any) => state.utensilsReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const basketObj = useSelector((state: any) => state.basketReducer);
  const addUpsellsObj = useSelector((state: any) => state.addUpsellReducer);
  const { upsells, vendorId: upsellsVendorId } = useSelector(
    (state: any) => state.getUpsellsReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [basketType, setBasketType] = useState();

  useEffect(() => {
    if (upsellsVendorId && upsellsVendorId !== restaurant?.id) {
      dispatch(getUpsellsRequest(restaurant?.id));
    } else if (!upsells && restaurant?.id) {
      dispatch(getUpsellsRequest(restaurant?.id));
    }
  }, []);

  useEffect(() => {
    console.log('upsells', upsells);
    if (upsells?.length) {
      const upsellsProductKeys: any = [];
      upsells.forEach((upsell: any) => {
        const productIds = upsell.products.map((prod: any) => prod.id);

        if (productIds?.length) {
          Array.prototype.push.apply(upsellsProductKeys, productIds);
        }
      });

      console.log('upsellsProductKeys', upsellsProductKeys);

      setUpsellsProductKeys(upsellsProductKeys);
    }
  }, [upsells]);

  const fitContainer = () => {
    const elem = document.getElementById('cart-main-conatiner');
    const cartBox = document.getElementById('cart-box');

    console.log('elem', elem);
    console.log('cartBox', cartBox);
    if (elem && cartBox) {
      if (basketObj?.basket?.products?.length > 0) {
        elem.style.height = cartBox?.clientHeight - 172 + 'px';
      } else {
        elem.style.height = cartBox?.clientHeight - 100 + 'px';
      }
      console.log('working', cartBox);
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
    setBasketType(basketObj?.basketType || '');
  }, []);

  // const updateUpsells = (upsells: any) => {
  //   let finalOptionsInArray: any = [];
  //   upsells.groups.map((g: any) => {
  //     g.items.map((item: any) => {
  //       if (!checkUpsellIsAdded(item.id)) {
  //         finalOptionsInArray.push(item);
  //       }
  //     });
  //   });
  //   setUpsells(finalOptionsInArray);
  // };

  useEffect(() => {
    if (addUpsellsObj?.basket && clickAction != '') {
      setClickAction('');
      // displayToast('SUCCESS', '1 item added to cart.');
      fitContainer();
      // dispatch(getBasketRequest('', addUpsellsObj.basket, basketType));
    }
  }, [addUpsellsObj]);

  useEffect(() => {
    if (productRemoveObj?.basket && actionStatus) {
      // dispatch(getBasketRequest('', productRemoveObj.basket, basketType));
      displayToast('SUCCESS', '1 item removed from cart.');
      fitContainer();
      setActionStatus(false);
      navigate(`/menu/${restaurant.slug}?cart=true`);
    }
  }, [productRemoveObj]);

  // useEffect(() => {
  //   if (upsellsObj && upsellsObj.upsells && basketObj && basketObj.basket) {
  //     updateUpsells(upsellsObj.upsells);
  //   }
  //   fitContainer();
  // }, [basketObj]);

  useEffect(() => {
    if (basketObj?.basket?.products?.length) {
      const utensils = basketObj.basket.products.filter(
        (obj: any) => obj.productId === utensilsReducer.utensilsProductId,
      );

      if (utensils?.length) {
        setUtensils(true);
      } else {
        setUtensils(false);
      }
    } else {
      setUtensils(false);
    }
  }, [basketObj]);

  useEffect(() => {
    if (basketObj?.basket?.products.length) {
      let array = basketObj.basket.products;
      const utensilsIndex = array.findIndex(
        (obj: any) => obj.productId === utensilsReducer.utensilsProductId,
      );
      if (utensilsIndex !== -1) {
        array.push(array.splice(utensilsIndex, 1)[0]);
      }
      setProducts(array);
    } else {
      setProducts([]);
    }
    setTimeout(() => {
      fitContainer();
    }, 500);
  }, [basketObj]);

  useEffect(() => {
    if (productAddObj && productAddObj.basket && actionStatus) {
      // dispatch(getBasketRequest('', productAddObj.basket, basketType));
      displayToast('SUCCESS', 'Duplicate item added to cart.');
      fitContainer();
      setActionStatus(false);
      navigate(`/menu/${restaurant.slug}?cart=true`);
    }
  }, [productAddObj]);

  const removeProductHandle = (productID: number) => {
    setActionStatus(true);
    dispatch(removeProductRequest(basketObj.basket.id, productID));
  };

  const duplicateProductHandle = (productID: number) => {
    const product = basketObj.basket.products.find(
      (x: any) => x.id == productID,
    );
    if (product) {
      setActionStatus(true);
      const request: any = {};
      request.productid = product.productId;
      request.quantity = product.quantity;
      let options = '';
      product.choices.map((item: any) => {
        options = options + item.optionid + ',';
      });
      request.options = options;
      dispatch(addProductRequest(basketObj.basket.id, request));
    }
  };

  // const addUpsells = (upsellID: number) => {
  //   const request = {
  //     items: [
  //       {
  //         id: upsellID,
  //         quantity: 1,
  //       },
  //     ],
  //   };
  //   setClickAction('clicked');
  //   dispatch(addUpsellsRequest(basketObj.basket.id, request));
  // };

  const getOptions = (options: any) => {
    let val = '';
    options.map((item: any) => {
      val = val + ' ' + item.name.trim() + ',';
    });
    return val.trim().replace(/,*$/, '');
  };

  const checkItemIsUpsells = (id: number) => {
    let aval = false;

    if (upsellsProductKeys?.length) {
      aval = upsellsProductKeys.includes(id);
    }
    return aval;
  };

  const checkItemIsSalsaUpsells = (id: number) => {
    let aval = false;

    if (upsellsProductKeys?.length) {
      aval = upsellsProductKeys.includes(id);
    }
    return aval;
  };

  // const checkUpsellIsAdded = (id: number) => {
  //   let aval = false;
  //   if (basketObj && basketObj.basket && basketObj.basket.products.length) {
  //     basketObj.basket.products.map((obj: any, index: number) => {
  //       if (obj.productId == id) {
  //         aval = true;
  //       }
  //     });
  //   }
  //   return aval;
  // };

  useEffect(() => {
    // const focusableElements =
    //   'button, [href], input, ul , li ,  select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#cart-box'); // select the modal by it's id
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

  const addRemoveUtensils = (e: any) => {
    console.log('e.target.checked', e.target.checked);
    if (e.target.checked) {
      const request: any = {};
      request.productid = utensilsReducer.utensilsProductId;
      request.quantity = 1;
      request.options = '';
      setUtensilsDisabled(true);
      dispatch(addUtensilsRequest(basketObj.basket.id, request));
    } else {
      console.log('e.target.checked 2', e.target.checked);
      if (basketObj?.basket?.products?.length) {
        const utensilsAllProducts = basketObj.basket.products.filter(
          (obj: any) => obj.productId === utensilsReducer.utensilsProductId,
        );
        if (utensilsAllProducts?.length) {
          setUtensilsDisabled(true);
          dispatch(
            removeUtensilsRequest(
              basketObj.basket.id,
              utensilsAllProducts[0].id,
            ),
          );
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const triggerFacebookEventOnCheckout = () => {
    let userObj: any = null;
    if (isLoginUser()) {
      userObj = {
        first_name: providerToken?.first_name || '',
        last_name: providerToken?.last_name || '',
        email: providerToken?.email || '',
        phone: providerToken?.phone || '',
      };
    }
    dispatch(
      facebookSendEvent(
        facebookConversionTypes.FACEBOOK_INITIATE_CHECKOUT_EVENT,
        userObj,
        null,
      ),
    );
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  return (
    <>
      <div className={classes.dimPanel} onClick={showCart}></div>

      <Box
        className={classes.cartBox}
        id="cart-box"
        aria-label="view your cart"
        role="dialog"
        aria-modal="true"
      >
        <Grid
          container
          spacing={0}
          className={classes.cartRoot}
          aria-label="view your cart"
          role="dialog"
          aria-modal="true"
        >
          <Grid item xs={12}>
            {/* <Typography
              variant="caption"
              component="div"
              className={classes.crossIcon}
            >
              <img
                src={crossIcon}
                title="Close Cart"
                height="20px"
                onClick={showCart}
                width="20px"
                alt="Close Cart"
              />
            </Typography> */}
            <Button
              className={classes.crossIcon}
              sx={{ position: 'absolute', minWidth: 'fit-content' }}
              aria-label="Close Cart"
              onClick={showCart}
            >
              <img
                src={crossIcon}
                title="Close Cart"
                height="20px"
                onClick={showCart}
                width="20px"
                alt="Close Cart"
              />
            </Button>
          </Grid>
          {(basketObj?.basket?.products?.length == 0 ||
            basketObj.basket == null) && (
            <Grid
              id="cart-main-conatiner"
              item
              xs={12}
              style={{
                height: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                paddingRight: '25px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Cart"
                role="img"
                style={{ width: '70px', marginBottom: '10px' }}
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="40"
                  fill-rule="evenodd"
                  d="M80,176a16,16,0,0,0-16,16V408c0,30.24,25.76,56,56,56H392c30.24,0,56-24.51,56-54.75V192a16,16,0,0,0-16-16Z"
                />
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="40"
                  fill-rule="evenodd"
                  d="M160,176V144a96,96,0,0,1,96-96h0a96,96,0,0,1,96,96v32"
                />
              </svg>
              {/*<svg*/}
              {/*xmlns="http://www.w3.org/2000/svg"*/}
              {/*viewBox="0 0 24 24"*/}
              {/*aria-label="Cart"*/}
              {/*role="img"*/}
              {/*style={{ width: '60px', marginBottom: '10px' }}*/}
              {/*>*/}
              {/*<path fill="none" d="M0 0h24v24H0V0z"></path>*/}
              {/*<path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>*/}
              {/*</svg>*/}
              <p className={classes.emptyCart}>Your Bag Is Currently Empty</p>
              <br />
              <Button
                variant="contained"
                title="Add Another Menu Item"
                sx={{ width: '100%', marginBottom: '15px' }}
                onClick={() => {
                  showCart();
                  return false;
                }}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    showCart();
                    return false;
                  }
                }}
              >
                Start Your Order
              </Button>
            </Grid>
          )}
          {basketObj?.basket?.products?.length > 0 && (
            <Grid item xs={12} sx={{ padding: '0 20px 0 0' }}>
              <Typography
                variant="h6"
                component="h6"
                className={classes.cartTitle}
                title="Your Order"
              >
                Your Order
              </Typography>
            </Grid>
          )}
          {products && products?.length > 0 && (
            <Grid
              item
              xs={12}
              id="cart-main-conatiner"
              sx={{ paddingRight: '25px' }}
            >
              {products.map((item: any, index: number) => (
                <Grid
                  key={Math.random() + index}
                  item
                  xs={12}
                  sx={{ padding: '0px' }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={9}>
                      <Typography
                        variant="h2"
                        title={item.name}
                        sx={{
                          fontSize: '14px',
                          color: 'secondary.main',
                          fontFamily: "'Librefranklin-Regular' !important",
                        }}
                      >
                        {item.productId !== utensilsReducer.utensilsProductId
                          ? item.quantity.toString() +
                            ' x ' +
                            item.name.toString()
                          : item.name.toString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="caption"
                        title={'$' + item.totalcost.toFixed(2)}
                        sx={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: '700',
                          fontFamily: "'Librefranklin-Regular' !important",
                          color: 'secondary.main',
                        }}
                      >
                        ${item.totalcost.toFixed(2)}
                      </Typography>
                    </Grid>
                    {/*{item.productId !== utensilsReducer.utensilsProductId ? (*/}
                    {/*<Grid item xs={12} sx={{ padding: '10px 0 10px 0' }}>*/}
                    {/*<Divider sx={{ borderColor: 'rgba(0, 0, 0, 1);' }} />*/}
                    {/*</Grid>*/}
                    {/*) : null}*/}
                    <Grid item xs={12}>
                      <Typography
                        title={getOptions(item.choices)}
                        variant="caption"
                        fontSize={11}
                        sx={{
                          paddingBottom: '0px',
                          paddingTop: '10px',
                          display: 'block',
                          fontFamily: "'Librefranklin-Regular' !important",
                        }}
                      >
                        {getOptions(item.choices)}
                      </Typography>
                    </Grid>
                    {item.productId !== utensilsReducer.utensilsProductId ? (
                      <Grid item xs={12} sx={{ padding: '0' }}>
                        <Grid container spacing={0}>
                          <ul className={`btnslist ${classes.btnsList}`}>
                            <li>
                              {productRemoveObj &&
                              productRemoveObj.loading &&
                              clickAction == item.id + '-remove' ? (
                                <Button
                                  key={Math.random() + 'disable-remove'}
                                  title="Remove"
                                  className={`${classes.disabledLink}  ${classes.btn}`}
                                  aria-label="Remove the item from basket"
                                  onClick={() => false}
                                  style={{ width: '75px !important' }}
                                >
                                  Remove
                                </Button>
                              ) : (
                                <Button
                                  title="Remove"
                                  key={Math.random() + 'active-remove'}
                                  className={`${classes.smallLink}  ${classes.btn}`}
                                  aria-label="Remove the item from basket"
                                  onClick={() => {
                                    removeProductHandle(item.id);
                                    setClickAction(item.id + '-remove');
                                  }}
                                  tabIndex={0}
                                  style={{ width: '75px !important' }}
                                >
                                  Remove
                                </Button>
                              )}{' '}
                            </li>
                            <li>
                              {!checkItemIsUpsells(item.productId) && (
                                <Grid item xs={3}>
                                  {productRemoveObj?.loading ||
                                  productAddObj?.loading ? (
                                    <Button
                                      key={Math.random() + 'disable-edit'}
                                      onClick={() => false}
                                      title="Edit"
                                      className={`${classes.smallLink}  ${classes.btn}`}
                                      style={{ width: '75px !important' }}
                                      aria-label="Make changes to the current menu item"
                                    >
                                      Edit
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        showCart();
                                        navigate(
                                          `product/${item.productId}/${
                                            item.id
                                          }${
                                            window.location.href
                                              .toLowerCase()
                                              .indexOf('product') == -1
                                              ? '?edit=true'
                                              : ''
                                          }`,
                                        );
                                      }}
                                      key={Math.random() + 'active-edit'}
                                      title="Edit"
                                      className={`${classes.smallLink}  ${classes.btn}`}
                                      style={{ width: '75px !important' }}
                                      aria-label="Make changes to the current menu item"
                                    >
                                      Edit
                                    </Button>
                                  )}
                                </Grid>
                              )}
                            </li>
                            <li>
                              {productAddObj?.loading &&
                              clickAction == item.id + '-add' ? (
                                <Button
                                  key={Math.random() + 'disable-duplicate'}
                                  onClick={() => false}
                                  className={`${classes.disabledLink}  ${classes.btn}`}
                                  style={{ width: '75px !important' }}
                                  title="Duplicate"
                                  aria-label="Duplicate the basket item"
                                >
                                  Duplicate
                                </Button>
                              ) : (
                                <Button
                                  key={Math.random() + 'active-duplicate'}
                                  onClick={() => {
                                    duplicateProductHandle(item.id);
                                    setClickAction(item.id + '-add');
                                  }}
                                  className={`${classes.smallLink}  ${classes.btn}`}
                                  style={{ width: '75px !important' }}
                                  title="Duplicate"
                                  aria-label="Duplicate the basket item"
                                  tabIndex={0}
                                >
                                  Duplicate
                                </Button>
                              )}
                            </li>
                          </ul>{' '}
                        </Grid>
                        <Grid item xs={12} sx={{ padding: '15px 0px' }}>
                          <Divider sx={{ borderColor: '#224c65' }} />
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>
                  {/*<Grid item xs={12}>*/}
                  {/*  <div style={{ height: '15px' }}></div>*/}
                  {/*</Grid>*/}
                </Grid>
              ))}
              {utensils && (
                <Grid item xs={12} sx={{ padding: '0px 0px 15px' }}>
                  <Divider sx={{ borderColor: '#224c65' }} />
                </Grid>
              )}
              {utensilsReducer?.utensilsProductId &&
                basketObj?.basket?.deliverymode !== DeliveryModeEnum.dinein && (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <img
                      className="item-image"
                      style={{ height: '35px' }}
                      src={require(`../../assets/imgs/untensils.png`)}
                      // alt={option.name}
                      // title={option.name}
                    />
                    <Typography
                      variant="body2"
                      className="body-text"
                      // title="I agree to the  Rubios terms and conditions and to receiving marketing communications from Rubios."
                      sx={{
                        paddingLeft: '10px',
                        width: '100%',
                        color: '#224c65',
                        fontFamily: "'Librefranklin-Regular' !important",
                      }}
                    >
                      Include Utensils
                    </Typography>
                    <Checkbox
                      checked={utensils}
                      disabled={utensilsReducer?.loading && utensilsDisabled}
                      onChange={(e) => {
                        addRemoveUtensils(e);
                      }}
                      inputProps={{
                        'aria-label': ' Include Utensils',
                      }}
                      sx={{
                        paddingLeft: 0,
                        fontFamily: "'GritSans-Bold' !important",
                      }}
                    />
                  </Grid>
                )}

              {basketObj?.basket?.deliverymode !== DeliveryModeEnum.dinein && (
                <Grid item xs={12} sx={{ padding: '20px 0px' }}>
                  <Divider sx={{ borderColor: '#224c65' }} />
                </Grid>
              )}

              <div
                className={'upsells'}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {basketObj?.basket?.products?.length > 0 &&
                  Object.keys(UPSELLS_TYPES).map(
                    (type: string, index: number) => {
                      return (
                        <>
                          {index === 1 && (
                            <Grid item xs={12}>
                              <Typography
                                variant="h6"
                                component="p"
                                fontSize="15px !important"
                                textAlign="center"
                                padding="10px 0 10px 0"
                                textTransform="uppercase"
                                className={classes.cartTitle}
                                title="Complete Your Meal"
                              >
                                Complete Your Meal
                              </Typography>
                            </Grid>
                          )}
                          <Grid
                            key={Math.random() + index}
                            option-id={index}
                            onClick={() => handleUpsells(type)}
                            onKeyPress={() => handleUpsells(type)}
                            className={
                              upsellsType === type
                                ? 'content-panel selected'
                                : 'content-panel'
                            }
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            sx={{ position: 'relative' }}
                          >
                            <input
                              checked={upsellsType === type}
                              style={{
                                opacity: 0,
                                position: 'absolute',
                                zIndex: 1000,
                              }}
                              type="checkbox"
                              id={`${index}-tab`}
                              value={index}
                            />
                            <label
                              tabIndex={0}
                              htmlFor={`${index}`}
                              style={{ width: '100%' }}
                              // onKeyUp={(e) => {
                              //   if (e.keyCode === 13)
                              //     showChildOptions(
                              //       itemChild.option.id,
                              //       itemMain.id,
                              //       itemChild.dropDownValues,
                              //       itemChild.selectedValue,
                              //     );
                              // }}
                            >
                              <Card
                                className="card-panel card-item"
                                title={type}
                                // is-mandatory={itemMain.mandatory.toString()}
                                // parent-option-id={itemMain.parentOptionID}
                              >
                                <Grid
                                  container
                                  spacing={1}
                                  className="name-img-panel"
                                  sx={{ padding: '0', marginTop: '0' }}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      padding: '0 !important',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Grid
                                      position={'relative'}
                                      item
                                      xs={4}
                                      lg={4}
                                    >
                                      <img
                                        className="item-image"
                                        src={require(`../../assets/imgs/${type}.jpg`)}
                                        // alt={option.name}
                                        // title={option.name}
                                      />
                                      <div className="check-mark">
                                        <div
                                          aria-hidden="true"
                                          className="checkmark"
                                        >
                                          L
                                        </div>
                                      </div>
                                    </Grid>

                                    <Grid
                                      item
                                      xs={8}
                                      lg={8}
                                      className="name-panel"
                                    >
                                      {type === UPSELLS_TYPES.SALSA
                                        ? `Select Your `
                                        : `Add A `}
                                      {capitalizeFirstLetter(type)}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Card>
                            </label>
                          </Grid>
                        </>
                      );
                    },
                  )}
              </div>

              {/*{basketObj &&*/}
              {/*  basketObj.basket &&*/}
              {/*  basketObj.basket.products.length > 0 &&*/}
              {/*  Object.keys(UPSELLS_TYPES).map(*/}
              {/*    (type: string, index: number) => {*/}
              {/*      return (*/}
              {/*        <>*/}
              {/*          {index === 1 && (*/}
              {/*            <Grid item xs={12}>*/}
              {/*              <Typography*/}
              {/*                variant="h6"*/}
              {/*                component="p"*/}
              {/*                fontSize="15px !important"*/}
              {/*                textAlign="center"*/}
              {/*                padding="10px 0 10px 0"*/}
              {/*                textTransform="uppercase"*/}
              {/*                className={classes.cartTitle}*/}
              {/*                title="Complete Your Meal"*/}
              {/*              >*/}
              {/*                Complete Your Meal*/}
              {/*              </Typography>*/}
              {/*            </Grid>*/}
              {/*          )}*/}

              {/*          <Grid*/}
              {/*            item*/}
              {/*            onClick={() => handleUpsells(type)}*/}
              {/*            xs={12}*/}
              {/*          >*/}
              {/*            <Grid*/}
              {/*              container*/}
              {/*              spacing={0}*/}
              {/*              justifyContent="space-around"*/}
              {/*              direction={'column'}*/}
              {/*              sx={{ paddingTop: '10px' }}*/}
              {/*            >*/}
              {/*              /!*<div className="check-mark">*!/*/}
              {/*              /!*  <div aria-hidden="true" className="checkmark">*!/*/}
              {/*              /!*    L*!/*/}
              {/*              /!*  </div>*!/*/}
              {/*              /!*</div>*!/*/}
              {/*              <Grid*/}
              {/*                key={Math.random() + '-'}*/}
              {/*                item*/}
              {/*                xs={12}*/}
              {/*                style={{*/}
              {/*                  display: 'flex',*/}
              {/*                  border: '1px solid rgba(0, 0, 0, 0.2)',*/}
              {/*                  padding: 10,*/}
              {/*                  minHeight: '85px',*/}
              {/*                  alignItems: 'center',*/}
              {/*                  boxShadow:*/}
              {/*                    '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',*/}
              {/*                }}*/}
              {/*                sx={{ cursor: 'pointer' }}*/}
              {/*                // onClick={() => {*/}
              {/*                //   addUpsells(option.id);*/}
              {/*                // }}*/}
              {/*                // tabIndex={0}*/}
              {/*                // onKeyUp={(e) => {*/}
              {/*                //   if (e.keyCode === 13) {*/}
              {/*                //     addUpsells(option.id);*/}
              {/*                //   }*/}
              {/*                // }}*/}
              {/*              >*/}
              {/*                <input*/}
              {/*                  checked={upsellsType === type}*/}
              {/*                  style={{*/}
              {/*                    opacity: 0,*/}
              {/*                    position: 'absolute',*/}
              {/*                    zIndex: 1000,*/}
              {/*                  }}*/}
              {/*                  type="checkbox"*/}
              {/*                  // id={index}*/}
              {/*                  // value={itemChild.name}*/}
              {/*                />*/}
              {/*                <img*/}
              {/*                  style={{*/}
              {/*                    // display: 'block',*/}
              {/*                    // margin: 'auto',*/}
              {/*                    width: '25%',*/}
              {/*                  }}*/}
              {/*                  src={require(`../../assets/imgs/${type}.jpg`)}*/}
              {/*                  // alt={option.name}*/}
              {/*                  // title={option.name}*/}
              {/*                />*/}
              {/*                <Typography*/}
              {/*                  variant="h6"*/}
              {/*                  component="p"*/}
              {/*                  fontSize="16px !important"*/}
              {/*                  textAlign="center"*/}
              {/*                  padding="0px 0 0 30px"*/}
              {/*                  lineHeight="1.2 !important"*/}
              {/*                  textTransform="capitalize"*/}
              {/*                  className={classes.cartTitle}*/}
              {/*                  sx={{*/}
              {/*                    display: 'inline',*/}
              {/*                    fontFamily: 'Poppins-Medium !important',*/}
              {/*                  }}*/}
              {/*                  // title={option.name}*/}
              {/*                >*/}
              {/*                  {type === UPSELLS_TYPES.SALSA*/}
              {/*                    ? `Select Your `*/}
              {/*                    : `Add A `}*/}
              {/*                  {capitalizeFirstLetter(type)}*/}
              {/*                </Typography>*/}
              {/*              </Grid>*/}
              {/*              /!*{upsells.map((option: any, index: number) => (*!/*/}
              {/*              /!*  <Grid*!/*/}
              {/*              /!*    key={Math.random() + '-' + index}*!/*/}
              {/*              /!*    item*!/*/}
              {/*              /!*    xs={4}*!/*/}
              {/*              /!*    sx={{ cursor: 'pointer' }}*!/*/}
              {/*              /!*    onClick={() => {*!/*/}
              {/*              /!*      addUpsells(option.id);*!/*/}
              {/*              /!*    }}*!/*/}
              {/*              /!*    tabIndex={0}*!/*/}
              {/*              /!*    onKeyUp={(e) => {*!/*/}
              {/*              /!*      if (e.keyCode === 13) {*!/*/}
              {/*              /!*        addUpsells(option.id);*!/*/}
              {/*              /!*      }*!/*/}
              {/*              /!*    }}*!/*/}
              {/*              /!*  >*!/*/}
              {/*              /!*    <img*!/*/}
              {/*              /!*      style={{*!/*/}
              {/*              /!*        display: 'block',*!/*/}
              {/*              /!*        margin: 'auto',*!/*/}
              {/*              /!*        width: '75%',*!/*/}
              {/*              /!*      }}*!/*/}
              {/*              /!*      src={require('../../assets/imgs/default_img.png')}*!/*/}
              {/*              /!*      alt={option.name}*!/*/}
              {/*              /!*      title={option.name}*!/*/}
              {/*              /!*    />*!/*/}
              {/*              /!*    <Typography*!/*/}
              {/*              /!*      variant="h6"*!/*/}
              {/*              /!*      component="p"*!/*/}
              {/*              /!*      fontSize="14px !important"*!/*/}
              {/*              /!*      textAlign="center"*!/*/}
              {/*              /!*      padding="5px 0 0 0"*!/*/}
              {/*              /!*      lineHeight="1.2 !important"*!/*/}
              {/*              /!*      textTransform="capitalize"*!/*/}
              {/*              /!*      className={classes.cartTitle}*!/*/}
              {/*              /!*      title={option.name}*!/*/}
              {/*              /!*    >*!/*/}
              {/*              /!*      {option.name}*!/*/}
              {/*              /!*    </Typography>*!/*/}
              {/*              /!*    <Typography*!/*/}
              {/*              /!*      variant="caption"*!/*/}
              {/*              /!*      component="p"*!/*/}
              {/*              /!*      fontSize="14px !important"*!/*/}
              {/*              /!*      textAlign="center"*!/*/}
              {/*              /!*      paddingTop="0px"*!/*/}
              {/*              /!*      fontFamily="Poppins-Regular !important"*!/*/}
              {/*              /!*      className={classes.cartTitle}*!/*/}
              {/*              /!*      title={`${option.cost}`}*!/*/}
              {/*              /!*    >*!/*/}
              {/*              /!*      {option.cost}*!/*/}
              {/*              /!*    </Typography>*!/*/}
              {/*              /!*  </Grid>*!/*/}
              {/*              /!*))}*!/*/}
              {/*            </Grid>*/}
              {/*          </Grid>*/}
              {/*        </>*/}
              {/*      );*/}
              {/*    },*/}
              {/*  )}*/}
              {basketObj?.basket?.products?.length > 0 && (
                <Grid item xs={12} textAlign="center" padding="10px 0">
                  <Button
                    variant="contained"
                    title="Add Another Menu Item"
                    onClick={() => {
                      showCart();
                      navigate(restaurant ? '/menu/' + restaurant.slug : '/');
                    }}
                    sx={{
                      textTransform: 'uppercase',
                      backgroundColor: 'secondary.main',
                      margin: 'auto',
                      width: '100%',
                      borderRadius: 0,
                      padding: '30px',
                      fontFamily: "'Sunborn-Sansone'!important",
                      fontSize: '10pt',
                    }}
                  >
                    Add Another Menu Item
                  </Button>
                </Grid>
              )}
              {basketObj?.basket?.products?.length > 0 && (
                <Grid item xs={12} padding="20px 0px 20px 0px">
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={9}
                      sx={{
                        fontFamily: "'Librefranklin-Bold' !important",
                        color: 'secondary.main',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        paddingBottom: '2px',
                      }}
                      title="Sub Total"
                    >
                      SUB TOTAL
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        fontFamily: "'Librefranklin-Bold' !important",
                        color: 'secondary.main',
                        fontSize: '14px',
                        textAlign: 'right',
                        fontWeight: 'bold',
                        paddingBottom: '2px',
                      }}
                      title={'$' + basketObj?.basket?.subtotal?.toFixed(2)}
                    >
                      ${basketObj?.basket?.subtotal?.toFixed(2)}
                    </Grid>
                    {basketObj?.basket?.discounts?.length > 0
                      ? basketObj.basket.discounts.map((discount: any) => {
                          return (
                            <>
                              <Grid
                                item
                                xs={9}
                                sx={{
                                  color: 'secondary.main',
                                  fontSize: '14px',
                                  paddingBottom: '2px',
                                  fontFamily:
                                    "'Librefranklin-Regular' !important",
                                }}
                              >
                                {discount.type === 'Coupon'
                                  ? 'Coupon Code: '
                                  : 'REWARD: '}
                                {discount.description}
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                sx={{
                                  color: 'secondary.main',
                                  fontSize: '14px',
                                  textAlign: 'right',
                                  paddingBottom: '2px',
                                  fontFamily:
                                    "'Librefranklin-Regular' !important",
                                }}
                              >
                                -$
                                {discount.amount && discount.amount.toFixed(2)}
                              </Grid>
                            </>
                          );
                        })
                      : null}
                    {basketObj?.basket?.tip > 0 ? (
                      <>
                        <Grid
                          item
                          xs={9}
                          sx={{
                            color: 'secondary.main',
                            fontSize: '14px',
                            paddingBottom: '2px',
                            fontFamily: "'Librefranklin-Regular' !important",
                          }}
                          title="TIP"
                        >
                          TIP
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            color: 'secondary.main',
                            fontSize: '14px',
                            textAlign: 'right',
                            paddingBottom: '2px',
                            fontFamily: "'Librefranklin-Regular' !important",
                          }}
                        >
                          +${basketObj.basket.tip}
                        </Grid>
                      </>
                    ) : null}
                    <Grid
                      item
                      xs={9}
                      sx={{
                        color: 'secondary.main',
                        fontSize: '14px',
                        paddingBottom: '2px',
                        fontFamily: "'Librefranklin-Regular' !important",
                        display: 'flex',
                      }}
                      // title="ESTIMATED TAX AND FEES"
                    >
                      <div>
                        {basketObj?.basket?.totalfees > 0 ? (
                          <>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontFamily:
                                  "'Librefranklin-Regular' !important",
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setShowMore(!showMore);
                              }}
                            >
                              ESTIMATED TAX AND FEES
                              {showMore ? (
                                <ExpandLessIcon
                                  aira-label="Expand Less"
                                  onClick={() => {
                                    setShowMore(!showMore);
                                  }}
                                  // className={classes.helpicon}
                                  style={{
                                    cursor: 'pointer',
                                    verticalAlign: 'bottom',
                                    color: 'secondary.main',
                                  }}
                                />
                              ) : (
                                <ExpandMoreIcon
                                  aira-label="Expand Less"
                                  onClick={() => {
                                    setShowMore(!showMore);
                                  }}
                                  // className={classes.helpicon}
                                  style={{
                                    cursor: 'pointer',
                                    verticalAlign: 'bottom',
                                    color: 'secondary.main',
                                  }}
                                />
                              )}
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            sx={{
                              fontSize: '14px',
                              fontFamily: 'Librefranklin-Regular !important',
                            }}
                          >
                            ESTIMATED TAXES
                          </Typography>
                        )}
                      </div>
                    </Grid>
                    {!showMore && (
                      <Grid
                        item
                        xs={3}
                        sx={{
                          color: 'secondary.main',
                          fontSize: '14px',
                          textAlign: 'right',
                          paddingBottom: '2px',
                          fontFamily: "'Librefranklin-Regular' !important",
                        }}
                        title={'$' + calculateTaxAndFee(basketObj.basket)}
                      >
                        ${calculateTaxAndFee(basketObj.basket)}
                      </Grid>
                    )}{' '}
                    {showMore ? (
                      <Grid container className={'taxes'} spacing={1}>
                        <Grid item xs={9}>
                          <Typography
                            sx={{
                              lineHeight: '1.0',
                              fontFamily: "'Librefranklin-Regular' !important",
                              fontSize: '14px !important',
                              color: '#062C43 !important',
                              marginLeft: '22px !important',
                            }}
                          >
                            SALES TAX:
                          </Typography>
                        </Grid>
                        <Grid item xs={3} justifyContent={'flex-end'}>
                          <Typography
                            sx={{
                              lineHeight: '1.0',
                              textAlign: 'right',
                              fontFamily: "'Librefranklin-Regular' !important",
                              color: '#062C43 !important',

                              fontSize: '14px !important',
                            }}
                            title={
                              '$' +
                              basketObj?.basket?.taxes
                                .reduce(
                                  (sum: number, tax: any) => sum + tax.tax,
                                  0,
                                )
                                .toFixed(2)
                            }
                          >
                            $
                            {basketObj?.basket?.taxes
                              .reduce(
                                (sum: number, tax: any) => sum + tax.tax,
                                0,
                              )
                              .toFixed(2)}
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            sx={{
                              lineHeight: '1.0',
                              fontFamily: "'Librefranklin-Regular' !important",
                              fontSize: '14px !important',
                              color: '#062C43',
                              marginBottom: '3px',
                              marginLeft: '22px !important',
                            }}
                          >
                            {basketObj?.basket?.fees?.length &&
                            basketObj.basket.fees.filter(
                              (fee: any) =>
                                fee.description ===
                                'UCSD Living Wage Surcharge',
                            ).length > 0
                              ? 'UCSD Living Wage Surcharge:'
                              : 'SERVICE FEE:'}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            sx={{
                              lineHeight: '1.0',
                              textAlign: 'right',
                              fontFamily: "'Librefranklin-Regular' !important",
                              fontSize: '14px !important',
                              color: '#062C43',
                            }}
                            title={'$' + orderFees(basketObj?.basket)}
                          >
                            ${orderFees(basketObj?.basket)}
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      /* <DialogActions>
                      <Button
                        aria-label="OK"
                        title="OK"
                        className="link default"
                        onClick={handleClose}
                      >
                        OK
                      </Button>
                    </DialogActions> */

                      ''
                    )}
                    {/*{basketObj &&*/}
                    {/*basketObj.basket &&*/}
                    {/*basketObj.basket.totalfees &&*/}
                    {/*basketObj.basket.totalfees > 0 ? (*/}
                    {/*  <>*/}
                    {/*    <Grid*/}
                    {/*      item*/}
                    {/*      xs={9}*/}
                    {/*      sx={{*/}
                    {/*        color: 'secondary.main',*/}
                    {/*        fontSize: '14px',*/}
                    {/*        fontFamily: 'Poppins-Regular',*/}
                    {/*      }}*/}
                    {/*      title="SERVICE FEE"*/}
                    {/*    >*/}
                    {/*      SERVICE FEE*/}
                    {/*    </Grid>*/}
                    {/*    <Grid*/}
                    {/*      item*/}
                    {/*      xs={3}*/}
                    {/*      sx={{*/}
                    {/*        color: 'secondary.main',*/}
                    {/*        fontSize: '14px',*/}
                    {/*        textAlign: 'right',*/}
                    {/*        fontFamily: 'Poppins-Regular',*/}
                    {/*      }}*/}
                    {/*      title={*/}
                    {/*        '$' +*/}
                    {/*        (basketObj &&*/}
                    {/*          basketObj.basket &&*/}
                    {/*          basketObj.basket.totalfees.toFixed(2))*/}
                    {/*      }*/}
                    {/*    >*/}
                    {/*      $*/}
                    {/*      {basketObj &&*/}
                    {/*        basketObj.basket &&*/}
                    {/*        basketObj.basket.totalfees.toFixed(2)}*/}
                    {/*    </Grid>*/}
                    {/*  </>*/}
                    {/*) : null}*/}
                    {basketObj?.basket?.customerhandoffcharge > 0 ? (
                      <>
                        <Grid
                          item
                          xs={9}
                          sx={{
                            color: 'secondary.main',
                            fontSize: '14px',
                            fontFamily: "'Librefranklin-Regular' !important",
                          }}
                          title="DELIVERY FEE"
                        >
                          DELIVERY FEE
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            color: 'secondary.main',
                            fontSize: '14px',
                            textAlign: 'right',
                            fontFamily: "'Librefranklin-Regular' !important",
                          }}
                          title={
                            '$' +
                            basketObj?.basket?.customerhandoffcharge?.toFixed(2)
                          }
                        >
                          $
                          {basketObj?.basket?.customerhandoffcharge?.toFixed(2)}
                        </Grid>
                      </>
                    ) : null}
                    <Grid item xs={12} sx={{ padding: '20px 0px' }}>
                      <Divider sx={{ borderColor: '#224c65' }} />
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      sx={{
                        fontFamily: "'Librefranklin-Bold' !important",
                        color: 'secondary.main',
                        fontSize: '15px',
                      }}
                      title="Total"
                    >
                      TOTAL
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        fontFamily: "'Librefranklin-Bold' !important",
                        color: 'secondary.main',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        textAlign: 'right',
                      }}
                      title={'$' + basketObj?.basket?.total?.toFixed(2)}
                    >
                      ${basketObj?.basket?.total?.toFixed(2)}
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {!isLoginUser() && (
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{ margin: 'auto' }}
                  >
                    <Button
                      type="submit"
                      aria-label="Sign in"
                      name="signin"
                      title="signin"
                      sx={{
                        textTransform: 'uppercase',
                        color: '#122a41',
                        fontSize: '1.1rem',
                        fontFamily: "'Sunborn-Sansone' !important",
                        width: '100%',
                        height: '70px',
                        border: '3px solid #122a41',
                        letterSpacing: '0.25px !important',
                      }}
                      onClick={() => {
                        showCart();
                        navigate('/login');
                      }}
                    >
                      Sign In To Use Rewards
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {basketObj?.basket?.products?.length > 0 ? (
              <Button
                variant="contained"
                id="proceedCheckout"
                onClick={() => {
                  showCart();
                  triggerFacebookEventOnCheckout();
                  return false;
                }}
                sx={{
                  textTransform: 'uppercase',
                  backgroundColor: '#0A6FB8',
                  margin: 'auto',
                  width: '100%',
                  borderRadius: 0,
                  padding: '30px 10px',
                  fontSize: '16px',
                  fontFamily: "'Sunborn-Sansone'!important",
                }}
                title="Checkout"
                aria-label="Checkout"
              >
                CHECKOUT
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                sx={{
                  textTransform: 'uppercase',
                  backgroundColor: '#5FA625',
                  margin: 'auto',
                  width: '100%',
                  borderRadius: 0,
                  padding: '30px 10px',
                  fontSize: '16px',
                  fontFamily: "'Sunborn-Sansone'!important",
                }}
                title="Checkout"
                aria-label="Checkout Button  disabled"
              >
                CHECKOUT
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Cart;
