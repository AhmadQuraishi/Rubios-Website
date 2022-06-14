import { Grid, Typography, Theme, Box, Divider, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import crossIcon from '../../../assets/imgs/close.png';
import { getBasketRequest } from '../../../redux/actions/basket';
import { removeProductRequest } from '../../../redux/actions/basket/product/remove';
import { addProductRequest } from '../../../redux/actions/basket/product/add';
import { displayToast } from '../../../helpers/toast';
import { addUpsellsRequest } from '../../../redux/actions/basket/upsell/Add';
import Salsa from './salsa';
import { UPSELLS, UPSELLS_TYPES } from '../../../helpers/upsells';
import './upsells.css';
import { capitalizeFirstLetter } from '../../../helpers/common';
import { addMultipleProductsRequest } from '../../../redux/actions/basket/addMultipleProducts';

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

const Upsells = ({ showCart, upsellsType }: any) => {
  const classes = useStyles();
  const [actionStatus, setActionStatus] = useState(false);
  const [addToBag, setAddToBag] = useState(false);
  const [clickAction, setClickAction] = useState('');
  const [upsells, setUpsells] = useState<any[]>();

  const productRemoveObj = useSelector(
    (state: any) => state.removeProductReducer,
  );
  const productAddObj = useSelector((state: any) => state.addProductReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const basketObj = useSelector((state: any) => state.basketReducer);
  const upsellsObj = useSelector((state: any) => state.getUpsellsReducer);
  const addUpsellsObj = useSelector((state: any) => state.addUpsellReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [basketType, setBasketType] = useState();

  const fitContainer = () => {
    const elem = document.getElementById('cart-main-conatiner');
    const cartBox = document.getElementById('cart-box');
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
    setBasketType((basketObj && basketObj.basketType) || '');
  }, []);

  // useEffect(() => {
  //   if (!runOnce) {
  //     return;
  //   }
  //   const payload = {
  //     products: [
  //       {
  //         productid: 13582537,
  //         quantity: 1,
  //         choices: [],
  //       },
  //       // {
  //       //   chainproductid: 364431,
  //       //   quantity: 1,
  //       //   choices: [],
  //       // },
  //       // {
  //       //   chainproductid: 364175,
  //       //   quantity: 1,
  //       //   choices: [],
  //       // },
  //     ],
  //   };

  //   if (basketObj && basketObj.basket) {
  //     dispatch(addMultipleProductsRequest(basketObj.basket.id, payload));
  //   }
  //   setRunOnce(false);
  // }, []);

  const updateUpsells = (upsells: any) => {
    let finalOptionsInArray: any = [];
    upsells.groups.map((g: any) => {
      g.items.map((item: any) => {
        if (!checkUpsellIsAdded(item.id)) {
          finalOptionsInArray.push(item);
        }
      });
    });
    setUpsells(finalOptionsInArray);
  };

  useEffect(() => {
    if (addUpsellsObj && addUpsellsObj.basket && clickAction != '') {
      setClickAction('');
      displayToast('SUCCESS', '1 item added to cart.');
      dispatch(getBasketRequest('', addUpsellsObj.basket, basketType));
    }
  }, [addUpsellsObj]);

  useEffect(() => {
    if (productRemoveObj && productRemoveObj.basket && actionStatus) {
      dispatch(getBasketRequest('', productRemoveObj.basket, basketType));
      displayToast('SUCCESS', '1 item removed from cart.');
      setActionStatus(false);
      navigate(restaurant ? '/menu/' + restaurant.slug : '/');
    }
  }, [productRemoveObj]);

  useEffect(() => {
    if (upsellsObj && upsellsObj.upsells && basketObj && basketObj.basket) {
      updateUpsells(upsellsObj.upsells);
    }
    fitContainer();
  }, [basketObj]);

  useEffect(() => {
    if (productAddObj && productAddObj.basket && actionStatus) {
      dispatch(getBasketRequest('', productAddObj.basket, basketType));
      displayToast('SUCCESS', 'Duplicate item added to cart.');
      setActionStatus(false);
      navigate(restaurant ? '/menu/' + restaurant.slug : '/');
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

  const addUpsells = (upsellID: number) => {
    const request = {
      items: [
        {
          id: upsellID,
          quantity: 1,
        },
      ],
    };
    setClickAction('clicked');
    dispatch(addUpsellsRequest(basketObj.basket.id, request));
  };

  const getOptions = (options: any) => {
    let val = '';
    options.map((item: any) => {
      val = val + ' ' + item.name.trim() + ',';
    });
    return val.trim().replace(/,*$/, '');
  };

  const checkItemIsUpsells = (id: number) => {
    let aval = false;
    if (upsellsObj && upsellsObj.upsells) {
      upsellsObj.upsells.groups.map((obj: any, index: number) => {
        obj.items.map((item: any, index: number) => {
          if (item.id == id) {
            aval = true;
          }
        });
      });
    }
    return aval;
  };

  const checkUpsellIsAdded = (id: number) => {
    let aval = false;
    if (basketObj && basketObj.basket && basketObj.basket.products.length) {
      basketObj.basket.products.map((obj: any, index: number) => {
        if (obj.productId == id) {
          aval = true;
        }
      });
    }
    return aval;
  };

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
          {/*{((basketObj &&*/}
          {/*  basketObj.basket &&*/}
          {/*  basketObj.basket.products.length == 0) ||*/}
          {/*  (basketObj && basketObj.basket == null)) && (*/}
          {/*  <Grid*/}
          {/*    id="cart-main-conatiner"*/}
          {/*    item*/}
          {/*    xs={12}*/}
          {/*    style={{*/}
          {/*      height: '220px',*/}
          {/*      display: 'flex',*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*      flexDirection: 'column',*/}
          {/*      paddingRight: '25px',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <svg*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*      viewBox="0 0 24 24"*/}
          {/*      aria-label="Cart"*/}
          {/*      role="img"*/}
          {/*      style={{ width: '60px', marginBottom: '10px' }}*/}
          {/*    >*/}
          {/*      <path fill="none" d="M0 0h24v24H0V0z"></path>*/}
          {/*      <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>*/}
          {/*    </svg>*/}
          {/*    <p className={classes.emptyCart}>Your Cart Is Currently Empty</p>*/}
          {/*    <br />*/}
          {/*    <Button*/}
          {/*      variant="contained"*/}
          {/*      title="Add Another Menu Item"*/}
          {/*      sx={{ width: '100%', marginBottom: '15px' }}*/}
          {/*      onClick={() => {*/}
          {/*        showCart();*/}
          {/*        return false;*/}
          {/*      }}*/}
          {/*      onKeyUp={(e) => {*/}
          {/*        if (e.keyCode === 13) {*/}
          {/*          showCart();*/}
          {/*          return false;*/}
          {/*        }*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      Start Your Order*/}
          {/*    </Button>*/}
          {/*  </Grid>*/}
          {/*)}*/}
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 && (
              <Grid item xs={12} sx={{ padding: '0 20px 0 0' }}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.cartTitle}
                  title="Your Order"
                >
                  {upsellsType === UPSELLS_TYPES.SALSA
                    ? `Select Your `
                    : `Add A `}
                  {capitalizeFirstLetter(upsellsType)}
                </Typography>
              </Grid>
            )}

          <Salsa addToBag={addToBag} upsellsType={upsellsType} />
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
            {basketObj &&
              basketObj.basket &&
              basketObj.basket.products.length > 0 && (
                <Grid item xs={12} lg={5} md={5} style={{paddingRight: '30px', }}>
                  <Button
                    variant="contained"
                    disabled={addToBag}
                    onClick={() => {
                      setAddToBag(true)
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
              )
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Upsells;
