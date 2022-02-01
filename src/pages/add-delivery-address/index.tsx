import {
  Switch,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
  Card,
} from '@mui/material';
import { Fragment } from 'react';
import LeftMenuBar from '../../components/left-menu-bar';

const AddDeliveryAddress = () => {
  return (
    <Fragment>
      <Typography variant="h4" title="Delivery Address">
        Delivery Address
      </Typography>
      <TextField aria-label="name" title="Name" placeholder="Name" />
      <TextField
        aria-label="street address 1"
        title="Street Address 1"
        placeholder="Street Address 1"
      />
      <TextField
        aria-label="street address 2"
        title="Street Address 2"
        placeholder="Street Address 2"
      />
      <TextField
        aria-label="current password"
        title="City, state"
        placeholder="City, state"
      />
      <TextField
        aria-label="zip code"
        title="Zip Code"
        placeholder="Zip Code"
      />
      <br />
      <Button aria-label="add address" variant="outlined" title="Add address">
        Add Address
      </Button>
    </Fragment>
  );
};

export default AddDeliveryAddress;
