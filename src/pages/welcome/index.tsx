import { makeStyles } from '@mui/styles';
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './welcome.css';
import React, {
  BaseSyntheticEvent,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import {
  getResturantInfoRequest,
  setResturantInfoRequest,
} from '../../redux/actions/restaurant';

import CardSkeletonUI from '../../components/card-skeleton-ui';
const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  caption: {},
}));

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recentorders, setOrders] = React.useState([]);
  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const { userProfile } = useSelector((state: any) => state.userReducer);
  const { userRecentOrders } = useSelector((state: any) => state.userReducer);
  const { restaurant, loading } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders(authtoken));
    dispatch(getResturantInfoRequest(64327));
  }, []);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      setOrders(userRecentOrders.orders);
    }
  }, [userRecentOrders]);

  const gotoCategoryPage = (e: BaseSyntheticEvent) => {
    const orderType = e.target.name;
    if (restaurant && orderType != undefined) {
      dispatch(setResturantInfoRequest(restaurant, orderType));
      navigate('/');
    }
  };

  const classes = useStyle();
  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid item xs={12} className="welcome-wrapper">
          <Grid container className="welcome-content">
            <Grid item xs={12} md={7} lg={7} className="left-col">
              <Typography variant="caption" className="label" title="Welcome">
                WELCOME
              </Typography>
              <Typography variant="h4" title="WELCOME BACK ALEXENDRA">
                WELCOME BACK {userProfile && userProfile.first_name}!
              </Typography>
              {loading && <CardSkeletonUI />}
              {!loading && recentorders.length < 1 && (
                <Typography>You don't have any recent orders</Typography>
              )}
              {!loading && recentorders.length > 0 && (
                <Fragment>
                  {recentorders.slice(0, 1).map((order: any) => (
                    <Fragment>
                      <Typography
                        variant="caption"
                        className="label"
                        title="LAST ORDER 11/01"
                      >
                        LAST ORDER {order.timeplaced.substr(6, 2)}/
                        {order.timeplaced.substr(4, 2)}
                      </Typography>
                      <Card elevation={0} className="product-card">
                        <CardMedia
                          component="img"
                          title="image"
                          image={require('../../assets/imgs/order-hidtory-icon.png')}
                          alt="image"
                          className="order-img"
                        />
                        <CardContent>
                          {order.products
                            .slice(0, 3)
                            .map((product: any, index: number) => (
                              <Fragment>
                                {index == 2 && order.products.length > 3 ? (
                                  <Typography
                                    variant="h6"
                                    title={product.name}
                                    key={product.name + product.quantity}
                                  >
                                    {product.quantity}x{' '}
                                    {product.name.substring(0, 19)}...
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="h6"
                                    title={product.name}
                                    key={product.name + product.quantity}
                                  >
                                    {product.quantity}x {product.name}
                                  </Typography>
                                )}
                              </Fragment>
                            ))}
                          <Grid className="order-action">
                            <Link
                              to="/product"
                              aria-label="edit order"
                              className="caption-grey"
                              title="EDIT ORDER"
                            >
                              Edit Order
                            </Link>
                            <Link
                              to="/product"
                              aria-label="re order"
                              className="label"
                              title="order"
                            >
                              Re Order
                            </Link>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Grid>
            <Grid item xs={12} md={5} lg={5} className="right-col">
              <Typography
                variant="caption"
                className="label"
                title="YOUR FAVORITE LOCATION"
              >
                YOUR FAVORITE LOCATION
              </Typography>
              {loading && <CardSkeletonUI />}
              {!loading && !restaurant && (
                <Typography>You don't have any favorite location</Typography>
              )}

              {!loading && restaurant && (
                <Grid container columns={16}>
                  <Grid item xs={16} sm={8} md={16} lg={16}>
                    <Typography variant="h5" title="Broadway Blvd">
                      {restaurant.name}
                      <Link
                        className="caption-grey"
                        title="change"
                        to="/location"
                      >
                        (change)
                      </Link>
                    </Typography>

                    <Typography
                      variant="h6"
                      title="20212 North 59th Ave, Ste.465A"
                    >
                      {restaurant.streetaddress}, {restaurant.zip}
                    </Typography>
                    <Typography variant="h6" title="San Diego, CA">
                      {restaurant.city}, {restaurant.state}
                    </Typography>
                    {restaurant.distance > 0 && (
                      <Typography variant="h6" title="distance">
                        {restaurant.distance} Miles Away
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={16} sm={8} md={16} lg={16}>
                    {restaurant.canpickup === true && (
                      <Button
                        aria-label="pickup button"
                        variant="contained"
                        title="PICKUP"
                        name="pickup"
                        onClick={gotoCategoryPage}
                      >
                        PICKUP
                      </Button>
                    )}
                    {restaurant.supportscurbside === true && (
                      <Button
                        aria-label="delivery button"
                        variant="contained"
                        title="DELIVERY"
                        name="delivery"
                        onClick={gotoCategoryPage}
                      >
                        DELIVERY
                      </Button>
                    )}

                    {restaurant.candeliver === true && (
                      <Button
                        aria-label="curbside button"
                        variant="contained"
                        title="CURBSIDE"
                        name="curbside"
                        onClick={gotoCategoryPage}
                      >
                        CURBSIDE
                      </Button>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Welcome;
