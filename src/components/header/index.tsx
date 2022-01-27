import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  Drawer,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/imgs/rubios-logo-color.png';
import cartIcon from '../../assets/imgs/cart-icon.svg';
import cartIconMobile from '../../assets/imgs/cart-icon-mobile.svg';

import { useState } from 'react';

import Cart from '../cart';

const useStyles = makeStyles((theme: Theme) => ({
  navBar: {
    backgroundColor: '#fff !important',
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 6%), 0px 4px 5px 0px rgb(0 0 0 / 6%), 0px 1px 10px 0px rgb(0 0 0 / 6%) !important',
  },
  logo: {
    flexGrow: '1',
    cursor: 'pointer',
  },
  logoImg: {
    display: 'inline-block',
    padding: '18px 70px',
    [theme.breakpoints.down('lg')]: {
      padding: '18px 0 14px 30px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '18px 0 14px 20px',
    },
  },
  icon: {
    color: theme.palette.primary.main + ' !important',
  },
  menuLink: {
    textTransform: 'uppercase',
    display: 'block',
    paddingTop: '35px',
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

const Header = () => {
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
            <Link to="/" className={classes.logoImg}>
              <img
                aria-label="Rubio's Cosatal Grill"
                src={logo}
                style={{ display: 'flex', width: '100%' }}
                alt="Rubio's Cosatal Grill"
              />
            </Link>
          </Typography>
          {isMobile ? (
            <>
              <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <div style={{ padding: '20px' }}>
                  <Link to="/category" className={classes.menuLink}>
                    Main Menu
                  </Link>
                </div>
              </Drawer>
              <img
                onClick={handleShowCart}
                src={cartIconMobile}
                alt="Cart Icon"
                style={{ width: '25px', paddingRight: '10px' }}
              />
              <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                className={classes.icon}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </>
          ) : (
            <>
              <Link to="/" className={classes.menuLink}>
                Main Menu
              </Link>
              <Typography
                component="div"
                onClick={handleShowCart}
                sx={{
                  backgroundColor: 'primary.main',
                  width: '140px',
                  cursor: 'pointer',
                  float: 'right',
                  justifyContent: 'center',
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': {
                    backgroundColor: 'success.main',
                  },
                  transition: 'background-color 0.3s ease',
                }}
              >
                <img src={cartIcon} style={{ width: '38px' }} alt="Cart Icon" />
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      {showCart && <Cart showCart={handleShowCart} />}
    </>
  );
};
export default Header;
