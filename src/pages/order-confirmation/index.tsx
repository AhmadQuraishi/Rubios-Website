import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Card, TextField, Button } from '@mui/material';
import OrderDetails from '../../components/order-details';
import OrderConfirmedCard from '../../components/order-confirm-card';
import { Fragment, useEffect } from 'react';
import './order-confirmation.css';
import { useDispatch, useSelector } from 'react-redux';
// import { removeBasketOrderConfirmation } from '../../redux/actions/basket/checkout';
import {
  getOrderRequest,
  getOrderRestaurantRequest,
} from '../../redux/actions/order';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterConfirmation from '../../components/register-confirmation';
import Page from '../../components/page-title';
import { requestEclubSignup } from '../../services/user';

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

const OrderConfirmation = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [runOnce, setRunOnce] = useState(true);
  const { loading: loadingOrder, data: order } = useSelector(
    (state: any) => state.orderReducer.order,
  );
  const { data: restaurant, loading: loadingRestaurant } = useSelector(
    (state: any) => state.orderReducer.restaurant,
  );

  const { authToken } = useSelector((state: any) => state.authReducer);
  const { guestUser } = useSelector((state: any) => state.orderReducer);

  useEffect(() => {
    dispatch(getOrderRequest(id));
  }, []);

  useEffect(() => {
    if (guestUser && !authToken?.authtoken) {
      if (
        guestUser.emailaddress &&
        guestUser.emailaddress !== '' &&
        guestUser.marketing_email_subscription
      ) {
        const response = requestEclubSignup({
          store_number: process.env.REACT_APP_ECLUB_STORE_ID,
          user: {
            email: guestUser.emailaddress,
            marketing_email_subscription: 'True',
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    if (runOnce && order && order.vendorid) {
      dispatch(getOrderRestaurantRequest(order.vendorid));
      setRunOnce(false);
    }
  }, [order]);

  return (
    <Page title={'Order Confirmation'} className="">
      <Fragment>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container className="order-confirmation">
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <OrderConfirmedCard
                  loadingOrder={loadingOrder}
                  loadingRestaurant={loadingRestaurant}
                  orderObj={order}
                  restaurantObj={restaurant}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Card
                  className={authToken?.authtoken ? 'card ' : 'card next-order'}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={12}
                      className="earn-reward"
                    >
                      <Typography variant="h2" className="label white">
                        {authToken?.authtoken ? 'YOUR REWARDS' : 'EARN REWARDS'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="white"
                        sx={{
                          fontFamily: 'Poppins-Bold !important',
                          fontSize: '36px !important',
                          lineHeight: '1.2',
                          letterSpacing: '-0.00833em',
                          textTransform: 'uppercase',
                        }}
                        title={
                          authToken?.authtoken
                            ? "You've earned points for Free Rubio's!"
                            : 'GET $5 OFF YOUR NEXT ORDER'
                        }
                      >
                        {authToken?.authtoken
                          ? "You've earned points for Free Rubio's!"
                          : 'GET $5 OFF YOUR NEXT ORDER'}
                      </Typography>
                      <br />
                      <Typography
                        variant="h6"
                        className="white"
                        title={
                          authToken?.authtoken
                            ? "You can cash in your points for free food when you get to 400, 700 or 1300 points. So keep enjoying your Rubio's favourites - tasty rewards are coming your way!"
                            : 'Join Rubio’s Rewards today to start earning rewards.'
                        }
                      >
                        {authToken?.authtoken
                          ? "You can cash in your points for free food when you get to 400, 700 or 1300 points. So keep enjoying your Rubio's favourites - tasty rewards are coming your way!"
                          : 'Join Rubio’s Rewards today to start earning rewards.'}
                      </Typography>
                      <br />
                      {authToken?.authtoken ? (
                        ''
                      ) : (
                        <img
                          className="phone-icon"
                          alt=""
                          src={require('../../assets/imgs/phone-icon.png')}
                        />
                      )}
                    </Grid>
                    {authToken?.authtoken ? (
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button
                          aria-label="view account"
                          variant="contained"
                          title="VIEW ACCOUNT"
                          onClick={() => navigate('/account/reward')}
                        >
                          VIEW ACCOUNT
                        </Button>
                        <Typography
                          variant="h6"
                          className="white hours-text"
                          title="Please allow up to 24 hours to show up in your account."
                          sx={{ paddingBottom: '10px' }}
                        >
                          Please allow up to 24 hours to show up in your
                          account.
                        </Typography>
                      </Grid>
                    ) : (
                      <RegisterConfirmation id={id} />
                    )}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={10} className="order-details">
            <OrderDetails basket={order} page="confirmation" />
          </Grid>
        </Grid>
      </Fragment>
    </Page>
  );
};

export default OrderConfirmation;
