import { makeStyles } from '@mui/styles';
import { Grid, Typography, Card, TextField } from '@mui/material';
import OrderDetails from '../../components/order-details';
import OrderConfirmedCard from '../../components/order-confirm-card';
import { Fragment } from 'react';

const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: 'blueviolet',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  card: {
    marginTop: '40px',
    marginLeft: '40px',
  },
}));

const OrderConfirmation = () => {
  const classes = useStyle();
  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <OrderConfirmedCard />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Card style={{ backgroundColor: 'blue' }}>
                <Typography
                  variant="caption"
                  style={{ color: 'white' }}
                  title="EARN REWARDS"
                >
                  EARN REWARDS
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: 'white' }}
                  title="GET $5 OFF YOUR"
                >
                  GET $5 OFF YOUR
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: 'white' }}
                  title="NEXT ORDER"
                >
                  NEXT ORDER
                </Typography>
                <Typography
                  variant="caption"
                  style={{ color: 'white' }}
                  title="Join today for completing the form below"
                >
                  Join today for completing the form below
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      aria-label="first name"
                      placeholder="Jhonathen"
                      title="first name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      aria-label="last name"
                      placeholder="Doe"
                      title="last name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      aria-label="email"
                      placeholder="ilovetacos@email.com"
                      title="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      aria-label="date of birth"
                      placeholder="11/19/1993"
                      title="date of birth"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      placeholder="#000 Broadway St.San Diego Ca."
                      aria-label="street address"
                      title="street address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      aria-label="password"
                      placeholder="*****"
                      type="password"
                      title="password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      aria-label="confirm password"
                      placeholder="*****"
                      type="confirm password"
                      title="confirm password"
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <OrderDetails
            name1="Maxicon street Corn Toca Plate"
            price1="$12.50"
            name2="Regular Mango Tea"
            price2="$2.50"
            reward=""
            rewardPrice=""
            subTotal="SUB TOTAL"
            subTotalPrice="$15.00"
            tax="TAX"
            taxPrice="$1.53"
            total="TOTAL"
            totalPrice="$16.53"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default OrderConfirmation;
