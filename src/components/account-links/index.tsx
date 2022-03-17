import { List, ListItem, ListItemText, Divider, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/actions/user';

const useStyles = makeStyles((theme: Theme) => ({
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
const AccountLinks = (props: any) => {
  const { closeDrawer } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userLogout());
    navigate('/login')
  }
  return (
    <List component="nav" aria-label="Account Menu">
      <ListItem>
        <Link
          to="/account/"
          aria-label="Your Rewards"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="My Rewards" primary="My Rewards" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/checkin"
          aria-label="checkin"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Check-In" primary="Check-In" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/orders"
          aria-label="your orders"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Orders" primary="Orders" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/paymentinformation"
          aria-label="payment information"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Payment Methods" primary="Payment Methods" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/deliveryaddress"
          aria-label="Delivery Addresses"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText
            title="Delivery Addresses"
            primary="Delivery Addresses"
          />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/history"
          aria-label="Your Account History"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Account History" primary="Account History" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/invite"
          aria-label="Invite Friends"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Invite Friends" primary="Invite Friends" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/profile"
          aria-label="Profile"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Profile" primary="Profile" />
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
          style={{cursor: 'pointer'}}
        >
          <ListItemText title="Logout" primary="Logout" />
        </Typography>
      </ListItem>
    </List>
  );
};

export default AccountLinks;
