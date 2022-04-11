import {
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import './update-card-info.css';
import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBillingAccountById } from '../../redux/actions/user';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 70px',
    [theme.breakpoints.down('lg')]: {
      padding: '0px 30px 40px 30px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 20px 40px 20px',
    },
    maxWidth: '1024px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '23px !important',
    },
  },
}));
const UpdatePaymentCard = () => {
  const { id } = useParams();
  let billingAccountId = parseInt(id || '');
  const classes = useStyles();
  const [billingAccountById, setBillingAccountById] = useState();
  const dispatch = useDispatch();
  const { userBillingAccountById, loading } = useSelector(
    (state: any) => state.userReducer,
  );
  // useEffect(() => {
  //   dispatch(getBillingAccountById(authtoken, billingAccountId ));
  // }, []);

  // useEffect(() => {
  //   if (userBillingAccountById) {
  //     console.log("userBillingAccountById", userBillingAccountById)
  //     // setBillingAccountById(userBillingAccounts.billingaccounts);
  //   }
  // }, [userBillingAccountById, loading]);

  return (
    <Grid
      container
      spacing={0}
      className={`${classes.root + ' payment-info-update'}`}
    >
      <Grid item xs={12}>
        <Typography
          variant="h1"
          aria-label={
            id ? 'Edit Payment Information' : 'Add Payment Information'
          }
          title={id ? 'Edit Payment Information' : 'Add Payment Information'}
          className={classes.heading}
        >
          {id ? 'Edit Payment Information' : 'Add Payment Information'}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '20px' }}>
        <Grid
          container
          spacing={0}
          sx={{
            flexDirection: { xs: 'column-reverse', lg: 'row' },
            width: { xs: '100%', md: '90%' },
          }}
        >
          <Grid
            item
            xs={12}
            lg={8}
            sx={{
              paddingRight: { xs: '0px', lg: '25px' },
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <TextField
                  aria-label="Card Nickname"
                  aria-required="true"
                  id="card_nickname"
                  label="Card Nickname"
                  sx={{ width: '100%' }}
                  title="Card Nickname"
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <TextField
                  aria-label="Name"
                  aria-required="true"
                  id="Name"
                  label="Name"
                  title="Name"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <TextField
                  aria-label="Card Number"
                  aria-required="true"
                  id="card_number"
                  label="Card Number"
                  title="Card Number"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <Grid container spacing={0} sx={{ paddingBottom: '20px' }}>
                  <Grid item xs={3}>
                    <TextField
                      aria-label="Card Expirey Month"
                      aria-required="true"
                      id="card_expirey_month"
                      label="MM"
                      title="Card Expirey Month"
                      sx={{ width: '90%' }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      aria-label="Card Expirey Year"
                      aria-required="true"
                      id="card_expirey_year"
                      label="YY"
                      title="Card Expirey Year"
                      sx={{ width: '90%' }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      aria-label="CVC"
                      aria-required="true"
                      id="cvc"
                      label="CVC"
                      title="CVC"
                      sx={{ width: '90%' }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  aria-label="Card Number"
                  aria-required="true"
                  id="card_number"
                  label="Card Number"
                  title="Card Number"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <TextField
                  aria-label="Street Address 1"
                  aria-required="true"
                  id="street_Address"
                  label="Street Address 1"
                  title="Street Address 1"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <TextField
                  aria-label="City & State"
                  aria-required="true"
                  id="city_state"
                  label="City, State"
                  title="City & State"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <TextField
                  aria-label="Zip Code"
                  aria-required="true"
                  id="zip_code"
                  label="Zip Code"
                  sx={{ width: '100%' }}
                  title="Zip Code"
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                <Button
                  variant="contained"
                  sx={{ width: { xs: '100%', lg: '400px' } }}
                  title="UPDATE CARD"
                  aria-label="UPDATE CARD"
                >
                  {id ? 'UPDATE CARD' : 'ADD CARD'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ paddingBottom: { xs: '20px' } }}>
            <Card className="card-border">
              <Grid container spacing={0} sx={{ padding: '20px' }}>
                <Grid item xs={3}>
                  <img
                    src={require('../../assets/imgs/card.png')}
                    alt="Card Image"
                    title="Card Image"
                    aria-label="Card Image"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1" title="Credit Card">
                    Credit Card
                  </Typography>
                  <Typography variant="body1" title="Mastercard x-9087">
                    Mastercard x-9087
                  </Typography>
                  <Typography variant="body1" title="Exp 01/23">
                    Exp 01/23
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="body1"
                    color="#999"
                    fontWeight="700"
                    component="a"
                    title="Delete"
                  >
                    DELETE
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdatePaymentCard;
