import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  Link,
  Drawer,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/imgs/rubios-logo-color.png';
import cart from '../../assets/imgs/cart-icon.svg';
import cartIconMobile from '../../assets/imgs/cart-icon-mobile.svg';

import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  navBar: {
    boxShadow: 'none',
    backgroundColor: '#fff',
  },
  logo: {
    flexGrow: '1',
    cursor: 'pointer',
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar
        sx={{ alignItems: { sm: 'inherit' }, padding: { xs: '0 !important' } }}
      >
        <Typography variant="h4" className={classes.logo}>
          <Link
            href="#"
            sx={{
              padding: {
                lg: '18px 70px',
                md: '18px 0 14px 30px',
                xs: '18px 0 14px 20px',
              },
              display: 'flex',
              maxWidth: {
                md: '236px',
                xs: '186px',
              },
            }}
          >
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
                <Link
                  href="#"
                  sx={{
                    textTransform: 'uppercase',
                    display: 'block',
                    paddingTop: '20px',
                    color: 'primary.main',
                    fontFamily: 'Poppins-Medium !important',
                    textDecoration: 'none',
                    fontSize: '14px',
                    textAlign: 'center',
                    '&:hover': {
                      color: 'success.main',
                    },
                    transition: 'color 0.5s ease',
                  }}
                >
                  Main Menu
                </Link>
              </div>
            </Drawer>
            <img
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
            <Link
              href="#"
              sx={{
                textTransform: 'uppercase',
                display: { xs: 'none', sm: 'flex' },
                padding: '30px 20px 0px 0px',
                color: 'primary.main',
                fontFamily: 'Poppins-Medium !important',
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: 'success.main',
                },
                transition: 'color 0.5s ease',
              }}
            >
              Main Menu
            </Link>
            <Typography
              component="div"
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
              <img src={cart} style={{ width: '38px' }} alt="Cart Icon" />
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
