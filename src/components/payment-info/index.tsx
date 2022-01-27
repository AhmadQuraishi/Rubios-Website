import React from 'react';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const PaymentInfo = () => {
  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />

      <Grid item xs={10} sm={11} md={11} lg={8}>
        <Typography variant="h4">PAYMENT INFO</Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <TextField placeholder="First Name" />
              </Grid>
              <Grid item xs={12}>
                <TextField placeholder="Card Number" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <TextField placeholder="Last Name" />
              </Grid>
              <Grid item xs={5}>
                <TextField placeholder="CVV" />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <TextField placeholder="MM/DD/YY" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3} sm={4} md={4} lg={5} />
              <Grid item xs={6} sm={4} md={4} lg={3}>
                <Button>ADD A GIFT CARD</Button>
              </Grid>
              <Grid item xs={3} sm={4} md={4} lg={5} />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3} sm={4} md={4} lg={5} />
              <Grid item xs={6} sm={4} md={4} lg={3}>
                <Button variant="contained">PLACE ORDER</Button>
              </Grid>
              <Grid item xs={3} sm={4} md={4} lg={5} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*column for space*/}
      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />
    </Grid>
  );
};

export default PaymentInfo;
