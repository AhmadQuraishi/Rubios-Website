import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  Button,
  Grid,
  Divider,
  Dialog,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/imgs/header-logo.png';
import cartIcon from '../../assets/imgs/cart-icon.svg';
import cartIconMobile from '../../assets/imgs/cart-icon-mobile.svg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Cart from '../cart';
import Upsells from '../cart/upsells';
import { useSelector } from 'react-redux';
import RightMenuBar from '../right-menu-bar';
import { isLoginUser } from '../../helpers/auth';
import './index.css';
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
    padding: '9px 70px 12px 85px',
    [theme.breakpoints.down('lg')]: {
      padding: '14px 0 14px 20px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '14px 0 14px 20px',
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
    paddingTop: '28px',
    paddingRight: '12px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '27px',
      paddingBottom: '22px',
      paddingRight: '12px',
      fontSize: '11pt',

    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '27px',
      paddingBottom: '22px',
      paddingRight: '12px',
      fontSize: '11pt',
    },
    color: theme.palette.primary.main,
    fontFamily: "'sunbornsans_one'!important",
    textDecoration: 'none',
    fontSize: '12pt',
    textAlign: 'center',
    '&:hover': {
      color: '#0073BD',
    },
    transition: 'color 0.5s ease',
  },
  menuLinkview: {
    textTransform: 'uppercase',
    display: 'block',
    whiteSpace: "nowrap",
    [theme.breakpoints.up('md')]: {
      fontSize: '11pt',

    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '11pt',
    },
    color: theme.palette.primary.main,
    fontFamily: "'sunbornsans_one'!important",
    textDecoration: 'none',
    fontSize: '12pt',
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
    fontFamily: "'sunbornsans_one'!important",
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
      <AppBar id={'page-header'} position="sticky" className={classes.navBar}>
        <Toolbar
          sx={{
            alignItems: { sm: 'inherit' },
            padding: { xs: '0 !important' },
          }}
        >
          <Typography variant="body1" className={classes.logo}>
            <span
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
            </span>
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
              {isLoginUser() && providerToken?.first_name ? (
                <Grid
                  container
                  sx={{
                    background: '#0075BF',
                    alignItems: 'center',
                    fontFamily: "'sunbornsans_one'!important",
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: '14px',
                    height: '80px',
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
                    {/* <AccountCircleOutlinedIcon sx={{ color: "#0073BD" }} /> */}
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
                      background: '#0075BF',
                      alignItems: 'center',
                      fontFamily: "'sunbornsans_one'!important",
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      height: '80px',
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
                      {/* <AccountCircleOutlinedIcon sx={{ color: "#0073BD" }} /> */}
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
                    backgroundColor: 'white',
                    height: '70px',
                    display: 'flex',

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
                      paddingTop: '34px',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      textAlign: 'center',
                      fontSize: '13px',
                      fontFamily: "'sunbornsans_one'!important",
                    }}
                  >
                      {basketObj.basket &&
                        basketObj.basket.products.length > 0 &&
                        getBasketCount(basketObj.basket)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
            <Grid  sx={{display: "flex", justifyContent: "space-evenly"}}>

              {restaurant && (
                <Grid sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: "50px",
                  marginLeft: "50px",
                  //width: { padding: "0px !important", margin: "0px !important"
                  //, lg: "106.5px", md: "106.5px", sm: '106.5px' 
                //}
                }}>
                  <Link

                    to={restaurant ? '/menu/' + restaurant.slug : '/'}
                    className={classes.menuLinkview}
                    title="View Menu"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    View Menu
                  </Link>
                </Grid>
              )}
              { window.location.href.toLocaleLowerCase().indexOf('/login') === -1 && window.location.href.toLocaleLowerCase().indexOf('/register') === -1 && window.location.href.toLocaleLowerCase().indexOf('/forgot') === -1 &&
                  restaurant && (!hideLoginPanel || !hideLoginedPanel) &&(
                    <Grid
                    >
                      <Typography className="v-line" sx={{ marginTop: { sm: "10px", lg: "15px", md: "11px" } }}>
      
                      </Typography>
                    </Grid>
                  )
                }
             
              {isLoginUser() && providerToken?.first_name
                ? !hideLoginedPanel && (
                  <Grid
                    container
                    sx={{
                      marginRight: "50px",
                      marginLeft: "50px",                     // width: { sm: '170px', md: '200px' },
                     // marginLeft: '15px',
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
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AccountCircleOutlinedIcon sx={{ color: "#0073BD",marginBottom:"3px", }} />
                      {/* <img
                          src={AccountCircleOutlinedIcon}
                          alt="Profile Icon"
                        />{' '} */}
                      <Typography
                        sx={{
                          paddingLeft: '5px',
                          display: 'block',
                          maxWidth: { sm: 'auto', lg: 'auto' },
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily: "'sunbornsans_one'!important",
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          fontSize: '11pt',
                          
                          color: "#0073BD",
                        }}
                      >
                        Hi {(isLoginUser() && providerToken?.first_name) || ''}
                        !
                      </Typography>
                      {!showAccountMenu && (
                        <span
                          style={{
                            paddingLeft: '5px',
                            fontSize: '12px',
                            color: "#0073BD",
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
                            color: "#0073BD",
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
                      //width: { sm: '170px', md: '200px' },
                      //marginLeft: '15px',
                      //background: '#0073BD',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginRight: "50px",
                      marginLeft: "50px",

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
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AccountCircleOutlinedIcon sx={{ color: "#0073BD" }} />
                      {/* <img
                          src={AccountCircleOutlinedIcon}
                          alt="Profile Icon"
                        />{' '} */}
                      <Typography
                        sx={{
                          paddingLeft: '5px',
                          display: 'block',
                          maxWidth: { sm: 'auto', lg: 'auto' },
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily: "'sunbornsans_one'!important",
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          fontSize: '11pt',
                          color: '#0073BD',
                        }}
                      >
                        Sign In!
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                
            </Grid>
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
                    paddingRight: { xs: '20px', md: '30px' },
                    paddingLeft: { xs: '20px', md: '30px' },
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: "0px !important",
                    backgroundColor: '#0073BD',
                    '&:hover': {
                      backgroundColor: '#0073BD',
                    },
                  }}
                >
                  <img
                    src={cartIcon}
                    style={{ width: '36px' }}

                    alt="Cart Icon"
                    title="Cart Icon"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      margin: 'auto',
                      inset: 'auto',
                      fontFamily: "'sunbornsans_one'!important",
                      display: 'inline',
                      paddingTop: '10px',
                      color: "white"
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
