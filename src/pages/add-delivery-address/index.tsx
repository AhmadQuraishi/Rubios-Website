import { Grid, Typography, TextField, Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './add-delivery-address.css';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));
const AddDeliveryAddress = () => {
  const { id } = useParams();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        className={classes.heading}
        variant="h4"
        title="Delivery Address"
      >
        Delivery Address
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Grid container className="daddress-section">
            <Grid item xs={12}>
              <TextField
                aria-label="Name"
                label="Name"
                title="Name"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="street address 1"
                title="Street Address 1"
                label="Street Address 1"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="street address 2"
                title="Street Address 2"
                label="Street Address 2"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="City, state"
                title="City, state"
                label="City, state"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="zip code"
                title="Zip Code"
                label="Zip Code"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                aria-label="add address"
                title="add address"
                variant="contained"
                sx={{ width: { xs: '100%', lg: '400px' } }}
              >
                {id ? 'Update Address' : 'Add Address'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddDeliveryAddress;
