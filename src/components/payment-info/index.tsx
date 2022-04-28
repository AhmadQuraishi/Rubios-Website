import React, { forwardRef } from 'react';
import { Grid, Typography } from '@mui/material';

import './payment-info.css';
import SplitPayment from './split-payment';
import AddGiftCard from './add-gift-card';
import AddCreditCard from './add-credit-card';

const PaymentInfo = forwardRef((props, _ref) => {
  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />

      <Grid item style={{ paddingBottom: 30 }} xs={12} sm={12} md={8} lg={8}>
        <Typography variant="h2" title="PAYMENT INFO">
          PAYMENT INFO
        </Typography>
        <br />
        <Grid container spacing={2} className="payment-form">
          <SplitPayment />
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} className="add-gift">
              <AddCreditCard />
              <AddGiftCard />
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
