import {
  Grid,
  Typography,
  Theme,
  Box,
  Divider,
  Button,
  Link as MUILink,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import crossIcon from '../../assets/imgs/cross-icon.svg';
import { getBasketRequest } from '../../redux/actions/basket';
import { removeProductRequest } from '../../redux/actions/basket/product/remove';
import { addProductRequest } from '../../redux/actions/basket/product/add';
import LoadingBar from '../loading-bar';
import { displayToast } from '../../helpers/toast';

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
    position: 'absolute',
    background: '#fff',
    top: 0,
    right: 0,
    width: '100%',
    minHeight: '300px',
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
    padding: '35px 30px 10px 30px',
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
    top: '15px',
    right: '10px',
    display: 'flex',
    justifyContent: 'right',
    '& img': {
      cursor: 'pointer',
    },
  },
  smallLink: {
    color: '#0075BF',
    fontSize: '11px !important',
    fontFamily: "'Poppins-Medium' !important",
    textDecoration: 'underline',
    display: 'inline',
    cursor: 'pointer',
  },
  disabledLink: {
    color: '#ccc !important',
    fontSize: '11px !important',
    fontFamily: 'Poppins-Medium !important',
    display: 'inline',
    textDecoration: 'none !important',
    cursor: 'pointer',
  },
}));

const Cart = (props: any) => {
  const { showCart } = props;
  const classes = useStyles();
  const [actionStatus, setActionStatus] = useState(false);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const productRemoveObj = useSelector(
    (state: any) => state.removeProductReducer,
  );
  const productAddObj = useSelector((state: any) => state.addProductReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (productRemoveObj && productRemoveObj.basket && actionStatus) {
      dispatch(getBasketRequest('', productRemoveObj.basket));
      displayToast('SUCCESS', '1 item removed from cart.');
      setActionStatus(false);
      navigate(restaurant ? '/menu/' + restaurant.slug : '/');
    }
  }, [productRemoveObj]);

  useEffect(() => {
    if (productAddObj && productAddObj.basket && actionStatus) {
      dispatch(getBasketRequest('', productAddObj.basket));
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

  const getOptions = (options: any) => {
    let val = '';
    options.map((item: any) => {
      val = val + ' ' + item.name.trim() + ',';
    });
    return val.trim().replace(/,*$/, '');
  };

  return (
    <>
      <div className={classes.dimPanel} onClick={showCart}></div>
      <Box className={classes.cartBox}>
        <Grid container spacing={0} className={classes.cartRoot}>
          <Grid item xs={12}>
            <Typography
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
            </Typography>
          </Grid>
          {((basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length == 0) ||
            (basketObj && basketObj.basket == null)) && (
            <Grid
              item
              xs={12}
              style={{
                height: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-label="Cart"
                role="img"
                style={{ width: '60px', marginBottom: '10px' }}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
              <h6>Your Cart Is Currently Empty</h6>
              <br />
              <Button
                variant="contained"
                title="Add Another Menu Item"
                sx={{ width: '100%', marginBottom: '15px' }}
                onClick={() => {
                  showCart();
                  return false;
                }}
              >
                Start Your Order
              </Button>
            </Grid>
          )}
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
                  Your Order
                </Typography>
              </Grid>
            )}
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.map((item: any, index: number) => (
              <Grid key={index} item xs={12} sx={{ padding: '0px' }}>
                <Grid container spacing={0}>
                  <Grid item xs={9}>
                    <Typography
                      variant="caption"
                      title={item.name}
                      sx={{
                        fontSize: '14px',
                        color: 'secondary.main',
                        fontFamily: "'Poppins-Medium' !important",
                      }}
                    >
                      {item.quantity.toString() + ' x ' + item.name.toString()}
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
                        fontFamily: 'Poppins-Bold !important',
                        color: 'secondary.main',
                      }}
                    >
                      ${item.totalcost.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ padding: '10px 0 10px 0' }}>
                    <Divider sx={{ borderColor: 'rgba(0, 0, 0, 1);' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      title={getOptions(item.choices)}
                      variant="caption"
                      fontSize={11}
                      sx={{ paddingBottom: '5px', display: 'block' }}
                    >
                      {getOptions(item.choices)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ padding: '0' }}>
                    <Grid container spacing={0}>
                      <Grid item xs={2}>
                        {(productRemoveObj && productRemoveObj.loading) ||
                        (productAddObj && productAddObj.loading) ? (
                          <MUILink
                            title="Remove"
                            className={classes.smallLink}
                            aria-label="Remove the item from basket"
                            onClick={() => false}
                          >
                            Remove
                          </MUILink>
                        ) : (
                          <MUILink
                            title="Remove"
                            className={classes.smallLink}
                            aria-label="Remove the item from basket"
                            onClick={() => removeProductHandle(item.id)}
                          >
                            Remove
                          </MUILink>
                        )}
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: 'center' }}>
                        {(productRemoveObj && productRemoveObj.loading) ||
                        (productAddObj && productAddObj.loading) ? (
                          <MUILink
                            onClick={() => false}
                            title="Edit"
                            className={classes.smallLink}
                            aria-label="Make changes to the current menu item"
                          >
                            Edit
                          </MUILink>
                        ) : (
                          <MUILink
                            onClick={() => {
                              showCart();
                              navigate(
                                `product/${item.productId}/${item.id}${
                                  window.location.href
                                    .toLowerCase()
                                    .indexOf('product') == -1
                                    ? '?edit=true'
                                    : ''
                                }`,
                              );
                            }}
                            title="Edit"
                            className={classes.smallLink}
                            aria-label="Make changes to the current menu item"
                          >
                            Edit
                          </MUILink>
                        )}
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: 'center' }}>
                        {(productRemoveObj && productRemoveObj.loading) ||
                        (productAddObj && productAddObj.loading) ? (
                          <MUILink
                            onClick={() => false}
                            className={classes.smallLink}
                            title="Duplicate"
                            aria-label="Duplicate the basket item"
                          >
                            Duplicate
                          </MUILink>
                        ) : (
                          <MUILink
                            onClick={() => duplicateProductHandle(item.id)}
                            className={classes.smallLink}
                            title="Duplicate"
                            aria-label="Duplicate the basket item"
                          >
                            Duplicate
                          </MUILink>
                        )}
                      </Grid>
                      <Grid item xs={3}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ height: '15px' }}></div>
                </Grid>
              </Grid>
            ))}
          {/* {basketObj && basketObj.basket && (
            <Grid item xs={12}>
              <Grid container spacing={0} justifyContent="space-around">
                <Grid item xs={3}>
                  <img
                    style={{ display: 'block', margin: 'auto' }}
                    src={require('../../assets/imgs/pic1.png')}
                    alt="Chips"
                    title="Chips"
                  />
                  <Typography
                    variant="h6"
                    component="p"
                    fontSize="14px !important"
                    textAlign="center"
                    padding="5px 0 0 0"
                    textTransform="capitalize"
                    className={classes.cartTitle}
                    title="Chips"
                  >
                    Chips
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    fontSize="14px !important"
                    textAlign="center"
                    paddingTop="0px"
                    fontFamily="Poppins-Regular !important"
                    className={classes.cartTitle}
                    title="$3.09"
                  >
                    $3.09
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <img
                    style={{ display: 'block', margin: 'auto' }}
                    src={require('../../assets/imgs/pic2.png')}
                    alt="Churros"
                    title="Churros"
                  />
                  <Typography
                    variant="h6"
                    component="p"
                    fontSize="14px !important"
                    textAlign="center"
                    padding="5px 0 0 0"
                    textTransform="capitalize"
                    className={classes.cartTitle}
                    title="Churros"
                  >
                    Churros
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    fontSize="14px !important"
                    textAlign="center"
                    paddingTop="0px"
                    fontFamily="Poppins-Regular !important"
                    className={classes.cartTitle}
                    title="$3.09"
                  >
                    $3.09
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <img
                    style={{ display: 'block', margin: 'auto' }}
                    src={require('../../assets/imgs/pic3.png')}
                    alt="Drinks"
                    title="Drinks"
                  />
                  <Typography
                    variant="h6"
                    component="p"
                    fontSize="14px !important"
                    textAlign="center"
                    padding="5px 0 0 0"
                    textTransform="capitalize"
                    className={classes.cartTitle}
                    title="drinks"
                  >
                    drinks
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    fontSize="14px !important"
                    textAlign="center"
                    paddingTop="0px"
                    fontFamily="Poppins-Regular !important"
                    className={classes.cartTitle}
                    title="$3.09"
                  >
                    $3.09
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )} */}
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 && (
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
                    fontFamily: "'Poppins-Medium', sans-serif !important;",
                    fontSize: '16px',
                  }}
                >
                  Add Another Menu Item
                </Button>
              </Grid>
            )}
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 && (
              <Grid item xs={12} padding="20px 0px 20px 0px">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      fontFamily: 'Poppins-Bold !important',
                      color: 'secondary.main',
                      fontSize: '14px',
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
                      fontFamily: 'Poppins-Bold !important',
                      color: 'secondary.main',
                      fontSize: '14px',
                      textAlign: 'right',
                      paddingBottom: '2px',
                    }}
                    title={
                      '$' +
                      (basketObj &&
                        basketObj.basket &&
                        basketObj.basket.subtotal.toFixed(2))
                    }
                  >
                    $
                    {basketObj &&
                      basketObj.basket &&
                      basketObj.basket.subtotal.toFixed(2)}
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      color: 'secondary.main',
                      fontSize: '14px',
                      paddingBottom: '2px',
                      fontFamily: 'Poppins-Regular',
                    }}
                    title="Tax"
                  >
                    SALES TAX
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      color: 'secondary.main',
                      fontSize: '14px',
                      textAlign: 'right',
                      paddingBottom: '2px',
                      fontFamily: 'Poppins-Regular',
                    }}
                    title={
                      '$' +
                      (basketObj &&
                        basketObj.basket &&
                        basketObj.basket.salestax.toFixed(2))
                    }
                  >
                    $
                    {basketObj &&
                      basketObj.basket &&
                      basketObj.basket.salestax.toFixed(2)}
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      color: 'secondary.main',
                      fontSize: '14px',
                      fontFamily: 'Poppins-Regular',
                    }}
                    title="Tax"
                  >
                    TOTAL FEE
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      color: 'secondary.main',
                      fontSize: '14px',
                      textAlign: 'right',
                      fontFamily: 'Poppins-Regular',
                    }}
                    title={
                      '$' +
                      (basketObj &&
                        basketObj.basket &&
                        basketObj.basket.totalfees.toFixed(2))
                    }
                  >
                    $
                    {basketObj &&
                      basketObj.basket &&
                      basketObj.basket.totalfees.toFixed(2)}
                  </Grid>
                  <Grid item xs={12} sx={{ padding: '20px 0px' }}>
                    <Divider sx={{ borderColor: '#224c65' }} />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      fontFamily: 'Poppins-Bold !important',
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
                      fontFamily: 'Poppins-Bold !important',
                      color: 'secondary.main',
                      fontSize: '15px',
                      textAlign: 'right',
                    }}
                    title={
                      '$' +
                      (basketObj &&
                        basketObj.basket &&
                        basketObj.basket.total.toFixed(2))
                    }
                  >
                    $
                    {basketObj &&
                      basketObj.basket &&
                      basketObj.basket.total.toFixed(2)}
                  </Grid>
                </Grid>
              </Grid>
            )}
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 ? (
              <Button
                variant="contained"
                onClick={() => {
                  showCart();
                  navigate('/checkout');
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
                  fontFamily: "'Poppins-Medium', sans-serif !important;",
                }}
                title="Checkout"
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
                  fontFamily: "'Poppins-Medium', sans-serif !important;",
                }}
                title="Checkout"
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
