import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/actions/user';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: '5px 5px',
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
    if (closeDrawer) {
      closeDrawer(false);
    }
    navigate('/login');
  };

  return (
    <List component="nav" aria-label="Account Menu">
      <ListItem>
        <Link
          to="/account/"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText primary="My Rewards" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/checkin"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText primary="Check-In" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/orders"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText primary="Orders" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/paymentinformation"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText primary="Payment Methods" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/deliveryaddress"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText primary="Delivery Addresses" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/history"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText primary="Account History" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/invite"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText primary="Invite Friends" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/account/profile"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
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
