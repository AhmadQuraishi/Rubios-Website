import { Link } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import footerLogo from '../../assets/imgs/footer-logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
  'footer-container': {
    background: theme.palette.secondary.main,
    padding: '30px 70px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('lg')]: {
      padding: '30px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '50px 20px',
    },
    '& .img-logo': {
      width: '236px',
      [theme.breakpoints.down('lg')]: {
        width: '186px',
      },
    },
    '& #main-menu': {
      width: '95%',
      '& ul': {
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '25px 0px',
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
        },
        '& li a': {
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          textTransform: 'uppercase',
          fontFamily: 'Poppins-Bold',
          fontWeight: 600,
          '&:hover': {
            color: theme.palette.success.main,
          },
        },
      },
    },
    '& #links-panel': {
      '& li a': {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '14px',
        textTransform: 'uppercase',
        '&:hover': {
          color: theme.palette.success.main,
        },
      },
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer style={{ overflow: 'hidden' }}>
      <div className={classes['footer-container']}>
        <img src={footerLogo} className="img-logo" alt="Rubios Coastal Grill" />
        <div id="main-menu">
          <ul>
            <li>
              <Link to="/">CAREERS</Link>
            </li>
            <li>
              <Link to="/">LOCATIONS</Link>
            </li>
            <li>
              <Link to="/">GIFT CARDS</Link>
            </li>
            <li>
              <Link to="/">FUNDRAISERS</Link>
            </li>
            <li>
              <Link to="/">PRESS & AWARDS</Link>
            </li>
            <li>
              <Link to="/">BLOG</Link>
            </li>
            <li>
              <Link to="/">Contact US</Link>
            </li>
          </ul>
        </div>
        <div style={{ display: 'None' }}>
          <div>
            <h3>Connect With Us</h3>
            <div></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;