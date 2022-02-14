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
        width: '80%'
      }
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

const Header = (props: any) => {
  const { removeCart } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showCart, setShowCart] = useState(false);
  const handleShowCart = () => {
    setShowCart(!showCart);
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
            {!removeCart ? (
              <Link to="/" className={classes.logoImg}>
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
                  to="/"
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
                  sx={{ fontSize: { xs: '11px', md: '13px' } }}
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
                    to="/category"
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
              {!removeCart && (
                <img
                  onClick={handleShowCart}
                  src={cartIconMobile}
                  alt="Cart Icon"
                  style={{ width: '28px', paddingRight: '10px' }}
                  title="Cart Icon"
                />
              )}
              <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                className={classes.icon}
              >
                <MenuIcon fontSize="large" titleAccess="Cart Icon" />
              </IconButton>
            </>
          ) : (
            <>
              <Link to="/" className={classes.menuLink} title="Main Menu">
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
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      {showCart && <Cart showCart={handleShowCart} />}
    </>
  );
};
export default Header;
