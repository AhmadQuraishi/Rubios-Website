import {
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Theme,
} from '@mui/material';
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
      fontFamily: 'Poppins-Medium !important'
    },
  },
}));

const LeftMenuBar = () => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        boxShadow: 2,
        width: '100%',
        bgcolor: 'background.paper',
        height: '100%',
      }}
    >
      <List component="nav" aria-label="Account Menu">
        <ListItem>
          <Link to="/account/" className={classes.link}>
            <ListItemText primary="My Rewards" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/account/checkin" className={classes.link}>
            <ListItemText primary="Check-In" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/account/ordersHistory" className={classes.link}>
            <ListItemText primary="Orders" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/account/paymentinformation" className={classes.link}>
            <ListItemText primary="Payment Methods" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/account/deliveryaddress" className={classes.link}>
            <ListItemText primary="Delivery Addresses" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/account/history" className={classes.link}>
            <ListItemText primary="Account History" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/account/invite" className={classes.link}>
            <ListItemText primary="Invite Friends" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/account/profile" className={classes.link}>
            <ListItemText primary="Profile" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/" className={classes.link}>
            <ListItemText primary="Logout" />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftMenuBar;
