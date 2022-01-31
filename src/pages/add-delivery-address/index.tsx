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
      <Typography variant="h4">Delivery Address</Typography>
      <TextField aria-label="name" placeholder="Name" />
      <TextField aria-label="street address 1" placeholder="Street Address 1" />
      <TextField aria-label="street address 2" placeholder="Street Address 2" />
      <TextField aria-label="current password" placeholder="City, state" />
      <TextField aria-label="zip code" placeholder="Zip Code" />
      <br />
      <Button aria-label="add address" variant="outlined">
        Add Address
      </Button>
    </Fragment>
  );
};

export default AddDeliveryAddress;
