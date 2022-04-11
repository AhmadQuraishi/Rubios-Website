import { makeStyles } from '@mui/styles';
import { Grid, Typography, Card, Button } from '@mui/material';
import OrderDetails from '../../components/order-details';
import OrderConfirmedCard from '../../components/order-confirm-card';
import { Fragment } from 'react';
import './reward-confirmation.css';

const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#73aac7',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  card: {
    marginTop: '40px',
    marginLeft: '40px',
  },
}));

const RewardConfirmation = () => {
  const classes = useStyle();
  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container className="reward-confirmation">
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <OrderConfirmedCard />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Card className="card">
                <Typography
                  variant="caption"
                  className="label white"
                  title="YOUR REWARDS"
                >
                  YOUR REWARDS
                </Typography>
                <Typography
                  variant="h1"
                  className="white"
                  title="YOU EARNED 18 POINTS!"
                >
                  YOU EARNED 18 POINTS!
                </Typography>
                <br />
                <Typography
                  variant="h6"
                  className="white"
                  title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent velit neque, vehicula vel magna ultricies, eleifend
                  bibendum ex. Donec id neque dui. Cras ac sodales risus. In at
                  ante nec sapien dictum imperdiet.
                </Typography>
                <Grid container>
                  <Grid item xs={12} md={7} lg={7}></Grid>
                  <Grid item xs={12} md={5} lg={5}>
                    <Button
                      aria-label="view account"
                      className="custom-btn cta1-btn"
                      variant="contained"
                      title="VIEW ACCOUNT"
                    >
                      VIEW ACCOUNT
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <br />
                <br />
                <br />
                <br />
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
            reward="Rubios Reward"
            rewardPrice="-$2.50"
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

export default RewardConfirmation;
