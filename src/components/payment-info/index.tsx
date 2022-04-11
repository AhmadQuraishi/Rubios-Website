import React, { forwardRef, useImperativeHandle } from 'react';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CreditCardElements, PaymentMethodResult } from '@olo/pay';
import './payment-info.css';

const styleObject = {
  base: {
    color: 'lightslategrey',
    fontSize: '5rem',
    fontFamily: 'sans-serif',
    '::placeholder': {
      color: '#000',
      fontFamily: 'Poppins-Regular, sans-serif',
    },
  },
  // complete: {
  //   color: 'peachpuff',
  //   fontFamily: 'Mr Dafoe, cursive',
  // },
  // invalid: {
  //   color: 'tomato',
  //   ':hover': {
  //     color: 'orangered',
  //   },
  // }
};

const PaymentInfo = forwardRef((props, _ref) => {
  const [creditCardElements, setCreditCardElements] =
    React.useState<CreditCardElements | null>(null);

  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethodResult | null>(null);

  useImperativeHandle(_ref, () => ({
    getCardDetails: async () => {
      const response =
        (await creditCardElements!.createPaymentMethod()) as PaymentMethodResult;
      setPaymentMethod(response);
      return response;
    },
  }));

  React.useEffect(() => {
    const initializeCreditCardElements = async () => {
      const elements = new CreditCardElements();
      // for production use
      // const elements = new CreditCardElements('production');

      elements.applyStyles(styleObject);

      setCreditCardElements(elements);

      await elements.create();
    };

    initializeCreditCardElements();
  }, []);

  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />

      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Typography variant="h1" title="PAYMENT INFO">
          PAYMENT INFO
        </Typography>
        <br />
        <Grid container spacing={2} className="payment-form">
          {/* <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="First Name"
                  aria-label="First Name"
                  aria-required="true"
                  title="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Last Name"
                  aria-label="Last Name"
                  aria-required="true"
                  title="Last Name"
                />
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className="payment-form image-field align"
              >
                <div className="card-fields" data-olo-pay-card-number></div>
                <img src={require('../../assets/imgs/card-icon.png')} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    className="payment-form image-field align"
                  >
                    <div className="card-fields" data-olo-pay-card-cvc></div>
                    <img src={require('../../assets/imgs/ccv-icon.png')} />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div className="card-fields" data-olo-pay-card-expiry></div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} className="add-gift">
              <Button title="ADD A GIFT CARD" className="label">
                ADD GIFT CARD
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />
    </Grid>
  );
});

export default PaymentInfo;
