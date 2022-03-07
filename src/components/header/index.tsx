import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  Drawer,
  IconButton,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Link } from 'react-router-dom';

import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/imgs/rubios-logo-color.png';
import cartIcon from '../../assets/imgs/cart-icon.svg';
import cartIconMobile from '../../assets/imgs/cart-icon-mobile.svg';

import Cart from '../cart';
import AccountLinks from '../account-links';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
  navBar: {
    backgroundColor: '#fff !important',
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 6%), 0px 4px 5px 0px rgb(0 0 0 / 6%), 0px 1px 10px 0px rgb(0 0 0 / 6%) !important',
  },
  logo: {
    flexGrow: '1',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    display: 'inline-block',
    padding: '18px 70px',
    [theme.breakpoints.down('lg')]: {
      padding: '18px 0 14px 30px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '18px 0 14px 20px',
    },
    '& img': {
      width: '90%',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
      },
    },
  },
  icon: {
    color: theme.palette.primary.main + ' !important',
  },
  menuLink: {
    textTransform: 'uppercase',
    display: 'block',
    paddingTop: '30px',
    paddingRight: '25px',
    color: theme.palette.primary.main,
    fontFamily: 'Poppins-Medium !important',
    textDecoration: 'none',
    fontSize: '14px',
    textAlign: 'center',
    '&:hover': {
      color: theme.palette.success.main,
    },
    transition: 'color 0.5s ease',
  },
}));
let fromEditOrder: Boolean = false;
const getBasketCount = (basket: any) => {
  var count = 0;
  basket.products.map((item: any) => {
    count = count + item.quantity;
  });
  return count;
};
export const handleCart = () => {
  fromEditOrder = true;
};

const Header = (props: any) => {
  const { removeCart, showUserName, removeCartForLocation } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showCart, setShowCart] = useState(false);
  const [state, setState] = useState(false);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  const handleShowCart = () => {
    if (fromEditOrder == true) {
      setShowCart(true);
      setState(!state);
      fromEditOrder = false;
      setShowCart(false);
    } else {
      setShowCart(!showCart);
    }
  };
  return (
    <>
      <AppBar position="sticky" className={classes.navBar}>
        <Toolbar
          sx={{
            alignItems: { sm: 'inherit' },
            padding: { xs: '0 !important' },
          }}
        >
          <Typography variant="h4" className={classes.logo}>
            {!showUserName ? (
              <Link to="/location" className={classes.logoImg}>
                <img
                  aria-label="Rubio's Cosatal Grill"
                  src={logo}
                  style={{ display: 'flex' }}
                  alt="Rubio's Cosatal Grill"
                  title="Rubio's Cosatal Grill Logo"
                />
              </Link>
            ) : (
              <>
                <Link
                  to="/location"
                  className={classes.logoImg}
                  style={{ padding: '20px 0px 20px 15px' }}
                >
                  <img
                    aria-label="Rubio's Cosatal Grill"
                    src={logo}
                    style={{ display: 'flex' }}
                    alt="Rubio's Cosatal Grill"
                    title="Rubio's Cosatal Grill Logo"
                  />
                </Link>
                <Typography
                  variant="body1"
                  component="span"
                  fontWeight="700"
                  paddingTop="5px"
                  sx={{
                    fontSize: { xs: '11px', md: '13px' },
                    paddingLeft: {
                      xs: '0px',
                      sm: '0px',
                      md: '25px',
                      lg: '36px',
                    },
                  }}
                  color="primary.main"
                  textTransform="uppercase"
                  title=" Hi Stacey"
                >
                  Hi, Stacey!
                </Typography>
              </>
            )}
          </Typography>

          {isMobile ? (
            <>
              <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <div style={{ padding: '20px' }}>
                  <Link
                    to={restaurant ? '/menu/' + restaurant.slug : '/'}
                    onClick={() => setOpenDrawer(false)}
                    className={classes.menuLink}
                    title="Main Menu"
                  >
                    Main Menu
                  </Link>
                </div>
                {removeCart && (
                  <AccountLinks
                    closeDrawer={removeCart ? setOpenDrawer : null}
                  />
                )}
              </Drawer>
              {!removeCart && !removeCartForLocation && (
                <div
                  style={{ position: 'relative', cursor: 'pointer' }}
                  onClick={handleShowCart}
                >
                  <img
                    src={cartIconMobile}
                    alt="Cart Icon"
                    style={{ width: '28px', paddingRight: '10px' }}
                    title="Cart Icon"
                  />
                  <div
                    style={{
                      color: 'rgb(34, 76, 101)',
                      position: 'absolute',
                      margin: 'auto',
                      inset: 'auto',
                      display: 'inline-block',
                      paddingTop: '18px',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      textAlign: 'center',
                      marginRight: '10px',
                      fontSize: '13px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Poppins-Medium',
                      }}
                    >
                      {basketObj.basket &&
                        basketObj.basket.products.length > 0 &&
                        getBasketCount(basketObj.basket)}
                    </span>
                  </div>
                </div>
              )}
              <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                className={classes.icon}
              >
                <MenuIcon fontSize="large" titleAccess="Menu Icon" />
              </IconButton>
            </>
          ) : (
            <>
              <Link
                to={restaurant ? '/menu/' + restaurant.slug : '/'}
                className={classes.menuLink}
                title="Main Menu"
              >
                Main Menu
              </Link>
              {!removeCart && (
                <Button
                  component="div"
                  onClick={handleShowCart}
                  aria-label="Open the cart"
                  sx={{
                    backgroundColor: 'primary.main',
                    width: '140px',
                    cursor: 'pointer',
                    float: 'right',
                    justifyContent: 'center',
                    borderRadius: 0,
                    position: 'relative',
                    display: { xs: 'none', sm: 'flex' },
                    '&:hover': {
                      backgroundColor: 'success.main',
                    },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <img
                    src={cartIcon}
                    style={{ width: '38px' }}
                    alt="Cart Icon"
                    title="Cart Icon"
                  />
                  <div
                    style={{
                      color: '#fff',
                      position: 'absolute',
                      margin: 'auto',
                      inset: 'auto',
                      display: 'inline',
                      paddingTop: '15px',
                    }}
                  >
                    {basketObj.basket &&
                      basketObj.basket.products.length > 0 &&
                      getBasketCount(basketObj.basket)}
                  </div>
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      {(fromEditOrder === true && <Cart showCart={handleShowCart} />) ||
        (showCart && <Cart showCart={handleShowCart} />)}
    </>
  );
};
export default Header;
