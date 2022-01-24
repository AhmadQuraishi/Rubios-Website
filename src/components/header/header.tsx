import { Link } from 'react-router-dom';

import logo from '../../assets/imgs/logo.svg';
import menuicon from '../../assets/imgs/menu-icon.svg';
import cart from '../../assets/imgs/cart-icon.svg';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  'header-container': {
    width: '100%',
    backgroundColor: '#fff',
    '& #logo': {
      padding: '14px 60px',
      boxSizing: 'border-box',
      float: 'left',
      [theme.breakpoints.down('lg')]: {
        padding: '14px 30px',
      },
      [theme.breakpoints.down('md')]: {
        padding: '14px 0 14px 20px',
        maxWidth: '206px',
      },
    },
    '& #content-panel': {
      color: theme.palette.primary.main,
      float: 'right',
      '& .content': {
        width: '100%',
        color: '#0069aa',
        display: 'flex',
        height: '76px',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        '& .menu-text': {
          fontWeight: 700,
          fontSize: '14px',
          textTransform: 'uppercase',
          paddingRight: '40px',
          paddingTop: '30px',
          boxSizing: 'border-box',
          '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              color: theme.palette.success.main,
            },
          },
        },
        '& .cart-icon': {
          backgroundColor: theme.palette.primary.main,
          width: '140px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.success.main,
          },
          '& img': {
            margin: 'auto',
            display: 'block',
            marginTop: '11px',
          },
        },
      },
      '& .menu-icon': {
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'inline-block',
          paddingTop: '25px',
          paddingRight: '22px',
        }
      }
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header style={{ overflow: 'hidden' }}>
      <div className={classes['header-container']}>
        <img src={logo} id="logo" alt="Rubios Coastal Grill" />
        <div id="content-panel">
          <div className="content">
            <p className="menu-text">
              <Link to="/">Main Menu</Link>
            </p>
            <p className="cart-icon">
              <img src={cart} alt="Cart Icon" />
            </p>
          </div>
          <div className="menu-icon">
            <img src={menuicon} alt="Menu Icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
