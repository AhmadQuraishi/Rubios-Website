import {
  Box,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/actions/user';
import AccountLinks from '../account-links';
import "./right-menu-bar.css";

const useStyles = makeStyles((theme: Theme) => ({
  dimPanel: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
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
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: '5px 0px',
    '& span': {
      fontSize: '13px !important',
      fontFamily: 'Poppins-Medium !important',
    },
  },
}));

const RightMenuBar = (props: any) => {
  const { closeDrawer, removeCart } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const logout = () => {
    dispatch(userLogout());
    closeDrawer(false);
    navigate('/login');
  };
  return (
    <>
      <div
        className={classes.dimPanel}
        onClick={() => closeDrawer(false)}
      ></div>
      <Box className="list-sec"
        sx={{
          boxShadow: 2,
          bgcolor: 'background.paper',
          height: '100%',
          position: 'fixed',
          width: {
            xs: '100%',
            sm: removeCart ? '150px' : '245px',
            md: removeCart ? '200px' : '295px',
          },
          right: '0px',
          zIndex: '1102',
          boxSizing: 'border-box',
        }}
      >
        <AccountLinks
          closeDrawer={(value: boolean) => {
            closeDrawer(value);
          }}
        />
        {/* <List component="nav" aria-label="Account Menu">
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/"
              aria-label="Your Rewards"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              {removeCart}
              <ListItemText title="My Rewards" primary="My Rewards" />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/checkin"
              aria-label="checkin"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              <ListItemText title="Check-In" primary="Check-In" />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/orders"
              aria-label="your orders"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              <ListItemText title="Orders" primary="Orders" />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/paymentinformation"
              aria-label="payment information"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              <ListItemText title="Payment Methods" primary="Payment Methods" />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/deliveryaddress"
              aria-label="Delivery Addresses"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              <ListItemText
                title="Delivery Addresses"
                primary="Delivery Addresses"
              />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/history"
              aria-label="Your Account History"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              <ListItemText title="Account History" primary="Account History" />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/invite"
              aria-label="Invite Friends"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              <ListItemText title="Invite Friends" primary="Invite Friends" />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Link
              to="/account/profile"
              aria-label="Profile"
              onClick={() => closeDrawer(false)}
              className={classes.link}
            >
              <ListItemText title="Profile" primary="Profile" />
            </Link>
          </ListItem>
          <ListItem style={{ padding: '3px' }}>
            <Typography
              // to="/"
              // aria-label="Logout"
              // onClick={() => (closeDrawer ? closeDrawer(false) : false)}
              onClick={() => logout()}
              className={classes.link}
              style={{ cursor: 'pointer' }}
            >
              <ListItemText title="Logout" primary="Logout" />
            </Typography>
          </ListItem>
        </List>  */}
      </Box>
    </>
  );
};

export default RightMenuBar;
