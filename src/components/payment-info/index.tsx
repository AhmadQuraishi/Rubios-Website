import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PaymentInfo = () => {
  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />

      <Grid item xs={10} sm={11} md={11} lg={8}>
        <Typography variant="h4" title="PAYMENT INFO">
          PAYMENT INFO
        </Typography>
        <Grid container>
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
              <Grid item xs={12}>
                <TextField
                  label="Card Number"
                  aria-label="Card Number"
                  aria-required="true"
                  title="Card Number"
                />
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
              <Grid item xs={5}>
                <TextField label="CVV" aria-label="CVV" aria-required="true" />
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

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3} sm={4} md={4} lg={5} />
              <Grid item xs={6} sm={4} md={4} lg={3}>
                <Button title="ADD A GIFT CARD">ADD A GIFT CARD</Button>
              </Grid>
              <Grid item xs={3} sm={4} md={4} lg={5} />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3} sm={4} md={4} lg={5} />
              <Grid item xs={6} sm={4} md={4} lg={3}>
                <Link
                  to="/orderconfirmation"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" title="PLACE ORDER">
                    PLACE ORDER
                  </Button>
                </Link>
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
