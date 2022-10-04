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
  Grid,
  Dialog,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/imgs/rubios-logo-color.png';
import cartIconMobile from '../../assets/imgs/cart-icon-mobile.svg';

import Cart from '../cart';
import Upsells from '../cart/upsells';
import { useSelector } from 'react-redux';
import RightMenuBar from '../right-menu-bar';

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
    padding: '18px 70px 18px 20px',
    [theme.breakpoints.down('lg')]: {
      padding: '18px 0 14px 20px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '18px 0 14px 20px',
    },
    '& img': {
      width: '90%',
      [theme.breakpoints.down('md')]: {
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
    paddingTop: '25px',
    paddingRight: '12px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '27px',
      paddingBottom: '22px',
      paddingRight: '12px',
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '27px',
      paddingBottom: '22px',
      paddingRight: '12px',
      fontSize: '14px',
    },
    color: theme.palette.primary.main,
    fontFamily: 'Poppins-Medium !important',
    textDecoration: 'none',
    fontSize: '17px',
    textAlign: 'center',
    '&:hover': {
      color: '#0073BD',
    },
    transition: 'color 0.5s ease',
  },
  menuItemLink: {
    textTransform: 'uppercase',
    display: 'block',
    paddingTop: '25px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '27px',
      paddingBottom: '22px',
      fontSize: '14px',
    },
    color: theme.palette.primary.main,
    fontFamily: 'Poppins-Medium !important',
    textDecoration: 'none',
    fontSize: '17px',
    textAlign: 'center',
    '&:hover': {
      color: '#0073BD',

      // color: theme.palette.success.main,
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
  const {
    removeCart,
    hideLoginPanel,
    removeCartForLocation,
    hideLoginedPanel,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showCart, setShowCart] = useState(false);
  const [showUpsells, setShowUpsells] = useState(false);
  const [upsellsType, setUpsellsType] = useState('');
  // const [state, setState] = useState(false);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();

  const handleShowCart = () => {
    setShowAccountMenu(false);
    if (fromEditOrder) {
      // setShowCart(true);
      //document.body.style.overflow = 'hidden';
      // setState(!state);
      fromEditOrder = false;
      setShowCart(false);
      //document.body.style.overflow = 'auto';
    } else {
      // if (!showCart) {
      // document.body.style.overflow = 'hidden';
      // } else {
      // document.body.style.overflow = 'auto';
      // }
      // setOpen(!showCart);
      setShowCart(!showCart);
    }
    if (showCart) {
      setShowUpsells(false);
      setUpsellsType('');
    }
  };

  const handleUpsells = (type: string) => {
    console.log('type', type);
    if (type === '') {
      setShowUpsells(false);
    } else {
      setShowUpsells(true);
    }
    setUpsellsType(type);
  };
  return (
    <>
      {console.log('window location', window.location.pathname)}
      <AppBar position="sticky" className={classes.navBar}>
        <Toolbar
          sx={{
            alignItems: { sm: 'inherit' },
            padding: { xs: '0 !important' },
          }}
        >
          <Typography variant="body1" className={classes.logo}>
            <p
              // to="/location"
              className={classes.logoImg}
            >
              <a href={process.env.REACT_APP_RUBIOS_HOME_PAGE}>
                <img
                  role={'button'}
                  tabIndex={0}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      navigate(`${process.env.REACT_APP_RUBIOS_HOME_PAGE}`);
                    }
                  }}
                  aria-label="Rubio's Cosatal Grill Logo"
                  src={logo}
                  style={{ display: 'flex' }}
                  alt="Rubio's Cosatal Grill"
                  title="Rubio's Cosatal Grill Logo"
                />
              </a>
            </p>
          </Typography>
          {isMobile ? (
            <>
              {restaurant && (
                <Link
                  to={restaurant ? '/menu/' + restaurant.slug : '/'}
                  className={
                    window.location.pathname === '/login' ||
                    window.location.pathname === '/register'
                      ? classes.menuItemLink
                      : classes.menuLink
                  }
                  title="Menu"
                  onClick={() => setShowAccountMenu(false)}
                >
                  Menu
                </Link>
              )}

              {/* <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
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
              </Drawer>
              <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                className={classes.icon}
              >
                <MenuIcon fontSize="large" titleAccess="Menu Icon" />
              </IconButton> */}
              {providerToken && providerToken.first_name ? (
                <Grid
                  container
                  sx={{
                    background: '#0073BD',
                    alignItems: 'center',
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: '14px',
                    height: '70px',
                    width: '65px',
                  }}
                  role={'button'}
                  aria-label={'Account Menu'}
                  tabIndex={0}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      setShowAccountMenu(!showAccountMenu);
                    }
                  }}
                  onClick={() => {
                    setShowAccountMenu(!showAccountMenu);
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <img
                      src={require('../../assets/imgs/user-icon.png')}
                      alt="Profile Icon"
                    />
                  </Grid>
                </Grid>
              ) : (
                !hideLoginPanel && (
                  <Grid
                    container
                    sx={{
                      background: '#0073BD',
                      alignItems: 'center',
                      fontFamily: 'Poppins-Medium',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      height: '70px',
                      width: '65px',
                    }}
                    role={'button'}
                    aria-label={'Sign In'}
                    tabIndex={0}
                    onKeyPress={(e: any) => {
                      if (e.key === 'Enter') {
                        navigate('/login');
                      }
                    }}
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <img
                        // style={{ width: '75%', display: 'block' }}
                        src={require('../../assets/imgs/user-icon.png')}
                        alt="Login Icon"
                      />
                    </Grid>
                  </Grid>
                )
              )}
              {!removeCart && !removeCartForLocation && (
                <div
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '72px',
                  }}
                  aria-label="Open the cart"
                  role={'button'}
                  onClick={handleShowCart}
                  tabIndex={0}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      handleShowCart();
                    }
                  }}
                >
                  <img
                    src={cartIconMobile}
                    alt="Cart Icon"
                    style={{
                      width: '32px',
                      display: 'block',
                      margin: 'auto',
                    }}
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
            </>
          ) : (
            <>
              {restaurant && (
                <Link
                  to={restaurant ? '/menu/' + restaurant.slug : '/'}
                  className={classes.menuLink}
                  title="View Menu"
                  onClick={() => setShowAccountMenu(false)}
                >
                  View Menu
                </Link>
              )}

              {providerToken && providerToken.first_name
                ? !hideLoginedPanel && (
                    <Grid
                      container
                      sx={{
                        width: { sm: '170px', md: '200px' },
                        marginLeft: '15px',
                        background: '#0073BD',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      role={'button'}
                      aria-label={'Account Menu'}
                      tabIndex={0}
                      onKeyPress={(e: any) => {
                        if (e.key === 'Enter') {
                          setShowAccountMenu(!showAccountMenu);
                        }
                      }}
                      onClick={() => {
                        setShowAccountMenu(!showAccountMenu);
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={require('../../assets/imgs/user-icon.png')}
                          alt="Profile Icon"
                        />{' '}
                        <Typography
                          sx={{
                            paddingLeft: '5px',
                            display: 'block',
                            maxWidth: { sm: '100px', lg: '130px' },
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'Poppins-Medium',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: '14px',
                          }}
                        >
                          Hi {(providerToken && providerToken.first_name) || ''}
                          !
                        </Typography>
                        {!showAccountMenu && (
                          <span
                            style={{
                              paddingLeft: '5px',
                              fontSize: '12px',
                            }}
                          >
                            &#9660;
                          </span>
                        )}
                        {showAccountMenu && (
                          <span
                            style={{
                              paddingLeft: '5px',
                              fontSize: '12px',
                            }}
                          >
                            &#9650;
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  )
                : !hideLoginPanel && (
                    <Grid
                      container
                      sx={{
                        width: { sm: '170px', md: '200px' },
                        marginLeft: '15px',
                        background: '#0073BD',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      role={'button'}
                      aria-label={'Sign In'}
                      tabIndex={0}
                      onKeyPress={(e: any) => {
                        if (e.key === 'Enter') {
                          navigate('/login');
                        }
                      }}
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={require('../../assets/imgs/user-icon.png')}
                          alt="Profile Icon"
                        />{' '}
                        <Typography
                          sx={{
                            paddingLeft: '5px',
                            display: 'block',
                            maxWidth: { sm: '100px', lg: '130px' },
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'Poppins-Medium',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: '14px',
                          }}
                        >
                          Sign In!
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
              {!removeCart && (
                <Button
                  component="div"
                  onClick={handleShowCart}
                  aria-label="Open the cart"
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      handleShowCart();
                    }
                  }}
                  sx={{
                    paddingRight: { xs: '20px', md: '40px' },
                    paddingLeft: '20px',
                    paddingTop: '5px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <img
                    src={cartIconMobile}
                    style={{ width: '36px' }}
                    alt="Cart Icon"
                    title="Cart Icon"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      margin: 'auto',
                      inset: 'auto',
                      fontFamily: 'Poppins-Medium',
                      display: 'inline',
                      paddingTop: '10px',
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
      {(fromEditOrder && <Cart showCart={handleShowCart} />) ||
        (showCart && (
          <Dialog
            open={showCart}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ border: '0' }}
          >
            {showUpsells &&
              upsellsType !== '' &&
              basketObj &&
              basketObj.basket &&
              basketObj.basket.products &&
              basketObj.basket.products.length && (
                <Upsells
                  upsellsType={upsellsType}
                  showCart={() => handleUpsells('')}
                />
              )}
            <Cart
              upsellsType={upsellsType}
              showCart={handleShowCart}
              handleUpsells={handleUpsells}
            />
          </Dialog>
        ))}
      {showAccountMenu && (
        <RightMenuBar
          closeDrawer={setShowAccountMenu}
          removeCart={removeCart}
        />
      )}
    </>
  );
};
export default Header;
