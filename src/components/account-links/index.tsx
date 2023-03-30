import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removePreviousAddresses } from '../../helpers/checkout';
import { userLogout } from '../../redux/actions/user';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: '5px 5px',
    '& span': {
      fontSize: '13px !important',
      fontFamily: "'GritSans-Bold' !important",
    },
  },
  selected: {
    backgroundColor: '#f5f5f5',
  color: "#062C43 !important",
  },
}));
const AccountLinks = (props: any) => {
  const { closeDrawer } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { duplicateAddress } = useSelector((state: any) => state.basketReducer);
  const logout = () => {
    dispatch(userLogout());
    removePreviousAddresses(duplicateAddress, null);
    if (closeDrawer) {
      closeDrawer(false);
    }
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  };

  const checkSelectedLink = (page: string) => {
    return window.location.href.toLocaleLowerCase().indexOf(page) !== -1;
  };

  return (
    <List component="nav" aria-label="Account Menu">
      <ListItem
        className={`${checkSelectedLink('/reward') ? classes.selected : ''}`}
      >
        <Link
          to="/account/reward"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/reward') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="My Rewards" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem
        className={`${checkSelectedLink('/checkin') ? classes.selected : ''}`}
      >
        <Link
          to="/account/checkin"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/checkin') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="Check-In" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem
        className={`${checkSelectedLink('/orders') ? classes.selected : ''}`}
      >
        <Link
          to="/account/orders"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/orders') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="Orders" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem
        className={`${
          checkSelectedLink('/paymentinformation') ? classes.selected : ''
        }`}
      >
        <Link
          to="/account/paymentinformation"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/paymentinformation') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="Payment Methods" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem
        className={`${
          checkSelectedLink('/deliveryaddress') ? classes.selected : ''
        }`}
      >
        <Link
          to="/account/deliveryaddress"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/deliveryaddress') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="Delivery Addresses" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem
        className={`${checkSelectedLink('/history') ? classes.selected : ''}`}
      >
        <Link
          to="/account/history"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/history') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="Account History" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem
        className={`${checkSelectedLink('/invite') ? classes.selected : ''}`}
      >
        <Link
          to="/account/invite"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/invite') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="Invite Friends" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem
        className={`${checkSelectedLink('/profile') ? classes.selected : ''}`}
      >
        <Link
          to="/account/profile"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={`${classes.link} ${
            checkSelectedLink('/profile') ? classes.selected : ''
          }`}
        >
          <ListItemText primary="Profile" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
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
    </List>
  );
};

export default AccountLinks;
