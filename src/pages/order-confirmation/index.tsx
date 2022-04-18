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
  const { loading, data: order } = useSelector(
    (state: any) => state.orderReducer.order,
  );
  const { data: restaurant } = useSelector(
    (state: any) => state.orderReducer.restaurant,
  );
  const { authToken } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(getOrderRequest(id));
  }, []);

  useEffect(() => {
    if (runOnce && order && order.vendorid) {
      dispatch(getOrderRestaurantRequest(order.vendorid));
      setRunOnce(false);
    }
  }, [order]);

  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container className="order-confirmation">
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <OrderConfirmedCard orderObj={order} restaurantObj={restaurant} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Card className="card">
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={12}>
                    <Typography variant="caption" className="label white">
                      {authToken?.authtoken ? 'YOUR REWARDS' : 'EARN REWARDS'}
                    </Typography>
                    <Typography variant="h1" className="white">
                      {authToken?.authtoken
                        ? 'YOUR EARNED 18 POINTS!'
                        : 'GET $5 OFF YOUR NEXT ORDER'}
                    </Typography>
                    <br />
                    <br />
                    <Typography
                      variant="h6"
                      className="white"
                      title="Join today for completing the form below"
                    >
                      {authToken?.authtoken
                        ? 'Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum'
                        : 'Join today for completing the form below'}
                    </Typography>
                    <br />
                    {authToken?.authtoken
                    ? ''
                    : (<img
                        className="phone-icon"
                        src={require('../../assets/imgs/phone-icon.png')}
                      />)
                    }
                  </Grid>
                  {authToken?.authtoken ? (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Button
                        aria-label="view account"
                        variant="contained"
                        title="VIEW ACCOUNT"
                        onClick={() => navigate('/account')}
                      >
                        VIEW ACCOUNT
                      </Button>
                    </Grid>
                  ) : (
                    <RegisterConfirmation />
                  )}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <OrderDetails basket={order} page="confirmation" />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default OrderConfirmation;
