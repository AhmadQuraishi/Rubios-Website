import { Grid, Typography, Theme, Box, Divider, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import crossIcon from '../../assets/imgs/cross-icon.svg';

const useStyles = makeStyles((theme: Theme) => ({
  dimPanel: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    zIndex: 10000,
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
    zIndex: 10001,
    [theme.breakpoints.up('md')]: {
      maxWidth: '375px',
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: 'auto !important',
    },
  },
  cartRoot: {
    padding: '20px 20px 10px 20px',
  },
  cartTitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '25px !important',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold !important',
    padding: '10px',
  },
  crossIcon: {
    display: 'flex',
    justifyContent: 'right',
    '& img': {
      cursor: 'pointer',
    },
  },
  smallLink: {
    color: '#0075BF',
    fontSize: '11px !important',
    fontFamily: 'Poppins-Medium !important',
    fomtWeight: '600',
    textDecoration: 'underline',
  },
}));
const Cart = (props: any) => {
  const { showCart } = props;
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          <Grid item xs={12} sx={{ padding: '0 10px 0 10px' }}>
            <Grid container spacing={0}>
              <Grid item xs={9}>
                <Typography
                  variant="caption"
                  title="Maxican Street Corn Taco Plate"
                  sx={{
                    fontSize: '13px',
                    color: 'secondary.main',
                    fontFamily: 'Poppins-Medium !important',
                  }}
                >
                  Maxican Street Corn Taco Plate
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                <Typography
                  variant="caption"
                  title="$12.05"
                  sx={{
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Poppins-Bold !important',
                    color: 'secondary.main',
                  }}
                >
                  $12.05
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '5px 0 5px 0' }}>
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 1);' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  title="Grilled Chicken Mexican Oil Butter Mix Topping"
                  variant="caption"
                  fontSize={11}
                >
                  Grilled Chicken Mexican Oil Butter Mix Topping
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '0' }}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <Link
                      title="Remove"
                      className={classes.smallLink}
                      to="/product"
                      aria-label="Remove the item from cart"
                    >
                      Remove
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link
                      to="/"
                      title="Edit"
                      className={classes.smallLink}
                      aria-label="Make changes to the current menu item"
                    >
                      Edit
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link
                      to="/"
                      className={classes.smallLink}
                      title="Duplicate"
                      aria-label="Duplicate the menu item"
                    >
                      Duplicate
                    </Link>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ padding: '20px 10px 0 10px' }}>
            <Grid container spacing={0}>
              <Grid item xs={9}>
                <Typography
                  variant="caption"
                  title="Regular Mango Tea"
                  sx={{
                    fontSize: '13px',
                    color: 'secondary.main',
                    fontFamily: 'Poppins-Medium !important',
                  }}
                >
                  Regular Mango Tea
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                <Typography
                  variant="caption"
                  title="$2.05"
                  sx={{
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Poppins-Bold !important',
                    color: 'secondary.main',
                  }}
                >
                  $2.05
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '5px 0 5px 0' }}>
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 1);' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  title="Medium, Light Ice"
                  variant="caption"
                  fontSize={11}
                >
                  Medium, Light Ice
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '0' }}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <Link
                      title="Remove"
                      className={classes.smallLink}
                      to="/product"
                      aria-label="Remove the item from cart"
                    >
                      Remove
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link
                      to="/"
                      title="Edit"
                      className={classes.smallLink}
                      aria-label="Make changes to the current menu item"
                    >
                      Edit
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link
                      to="/"
                      className={classes.smallLink}
                      title="Duplicate"
                      aria-label="Duplicate the menu item"
                    >
                      Duplicate
                    </Link>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h6"
              fontSize="18px !important"
              textAlign="center"
              paddingTop="20px"
              className={classes.cartTitle}
              title="Complete Your Meal"
            >
              Complete Your Meal
            </Typography>
          </Grid>
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
          <Grid item xs={12} textAlign="center" padding="10px 0">
            <Button
              variant="contained"
              title="Add Another Menu Item"
              sx={{
                textTransform: 'uppercase',
                backgroundColor: 'secondary.main',
                margin: 'auto',
                width: '100%',
                borderRadius: 0,
                padding: '15px',
              }}
            >
              Add Another Menu Item
            </Button>
          </Grid>
          <Grid item xs={12} padding="20px 10px 20px 20px">
            <Grid container spacing={0}>
              <Grid
                item
                xs={9}
                sx={{
                  fontFamily: 'Poppins-Bold !important',
                  color: 'secondary.main',
                  fontize: '16px',
                }}
                title="Sub Total"
              >
                Sub Total
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  fontFamily: 'Poppins-Bold !important',
                  color: 'secondary.main',
                  fontize: '16px',
                  textAlign: 'right',
                }}
                title="$15.00"
              >
                $15.00
              </Grid>
              <Grid
                item
                xs={9}
                sx={{
                  color: 'secondary.main',
                  fontize: '12px',
                }}
                title="Tax"
              >
                Tax
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  color: 'secondary.main',
                  fontize: '16px',
                  textAlign: 'right',
                }}
                title="$1.53"
              >
                $1.53
              </Grid>
              <Grid item xs={12} sx={{ padding: '20px 0px' }}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={9}
                sx={{
                  fontFamily: 'Poppins-Bold !important',
                  color: 'secondary.main',
                  fontize: '16px',
                }}
                title="Total"
              >
                Total
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  fontFamily: 'Poppins-Bold !important',
                  color: 'secondary.main',
                  fontize: '16px',
                  textAlign: 'right',
                }}
                title="$16.53"
              >
                $16.53
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Link
              to="/checkout"
              aria-label="checkout"
              style={{ textDecoration: 'none' }}
              onClick={showCart}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: 'uppercase',
                  backgroundColor: 'primary.main',
                  margin: 'auto',
                  width: '100%',
                  borderRadius: 0,
                  padding: '10px',
                }}
                title="Checkout"
              >
                CHECKOUT
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Cart;
