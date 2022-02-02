import { List, ListItem, ListItemText, Divider, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

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
  return (
    <List component="nav" aria-label="Account Menu">
      <ListItem>
        <Link
          to="/account/"
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
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Profile" primary="Profile" />
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        <Link
          to="/"
          onClick={() => (closeDrawer ? closeDrawer(false) : false)}
          className={classes.link}
        >
          <ListItemText title="Logout" primary="Logout" />
        </Link>
      </ListItem>
    </List>
  );
};

export default AccountLinks;
