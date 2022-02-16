import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './payment-info.css';

const PaymentInfo = () => {
  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={12} sm={12} md={2} lg={2} />

      <Grid item xs={10} sm={11} md={11} lg={8}>
        <Typography variant="h4" title="PAYMENT INFO">
          PAYMENT INFO
        </Typography>
        <br/>
        <Grid container spacing={2} className="payment-form">
          <Grid item xs={12} sm={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  label="First Name"
                  aria-label="First Name"
                  aria-required="true"
                  title="First Name"
                />
              </Grid>
              <Grid item xs={12} className="image-field">
                <TextField
                  label="Card Number"
                  aria-label="Card Number"
                  aria-required="true"
                  title="Card Number"
                />
                <img src={require('../../assets/imgs/card-icon.png')} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  aria-label="Last Name"
                  aria-required="true"
                  title="Last Name"
                />
              </Grid>
              <Grid item xs={5} className="image-field">
                <TextField label="CVV" aria-label="CVV" aria-required="true" />
                <img src={require('../../assets/imgs/ccv-icon.png')} />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <TextField
                  label="MM/DD/YY"
                  aria-label="Month/Day/Year"
                  aria-required="true"
                  title="MM/DD/YY"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} className="add-gift">
              <Button title="ADD A GIFT CARD" className="label">ADD GIFT CARD</Button>
            </Grid>
          </Grid>

          <Grid container className="add-order">
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Link
                to="/orderconfirmation"
                aria-label="place your order"
              >
                <Button variant="contained" title="PLACE ORDER">
                  PLACE ORDER
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*column for space*/}
      <Grid item xs={1} sm={12} md={2} lg={2} />
    </Grid>
  );
};

export default PaymentInfo;
