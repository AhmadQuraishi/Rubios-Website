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
import { createBasketFromPrev } from '../../redux/actions/basket/create';
import { getFavRestaurant } from '../../redux/actions/restaurant/fav-restaurant';
import { getBasketRequest } from '../../redux/actions/basket';
import { displayToast } from '../../helpers/toast';
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
  const classes = useStyle();

  const [recentorders, setOrders] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isReoder, setIsReoder] = useState(false);
  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const { userProfile } = useSelector((state: any) => state.userReducer);
  const { userRecentOrders } = useSelector((state: any) => state.userReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { favRestaurant, loading } = useSelector(
    (state: any) => state.favRestaurantReducer,
  );
  useEffect(() => {
    dispatch(getUserRecentOrders(authtoken));
    dispatch(getFavRestaurant(64327));
  }, []);
  useEffect(() => {
    console.log('inside');
    if (
      basketObj &&
      basketObj.basket &&
      basketObj.basket.products &&
      basketObj.basket.products.length > 0
    ) {
      console.log(basketObj);
      dispatch(
        setResturantInfoRequest(restaurant, basketObj.basket.deliverymode),
      );

      if (isReoder) {
        navigate('/checkout');
      }
      if (isEdit) {
        navigate(restaurant ? '/menu/' + restaurant.slug : '/');
      }
      setIsEdit(false);
      setIsReoder(false);
    }
  }, [basketObj]);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      setOrders(userRecentOrders.orders);
    }
  }, [userRecentOrders]);

  const gotoCategoryPage = (e: BaseSyntheticEvent) => {
    const orderType = e.target.name;
    if (favRestaurant && orderType != undefined) {
      dispatch(setResturantInfoRequest(favRestaurant, orderType));
      dispatch(getBasketRequest('', null));
      displayToast('SUCCESS', 'Location changed to ' + favRestaurant.name);
      navigate(favRestaurant ? '/menu/' + favRestaurant.slug : '/');
    }
  };
  const reoderHandler = (id: string, orderref: string, vendorid: number) => {
    const body = {
      orderref: orderref,
      id: id,
      ignoreunavailableproducts: true,
    };
    dispatch(createBasketFromPrev(body));
    dispatch(getResturantInfoRequest(vendorid));
    setIsReoder(true);
  };
  const editHandler = (id: string, orderref: string, vendorid: number) => {
    const body = {
      orderref: orderref,
      id: id,
      ignoreunavailableproducts: true,
    };
    // dispatch(getBasketRequest('', null));
    dispatch(createBasketFromPrev(body));
    dispatch(getResturantInfoRequest(vendorid));
    setIsEdit(true);
  };

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
                            <Button
                              aria-label="edit order"
                              className="caption-grey"
                              title="EDIT ORDER"
                              onClick={() => {
                                editHandler(
                                  order.id,
                                  order.orderref,
                                  order.vendorid,
                                );
                              }}
                            >
                              Edit Order
                            </Button>
                            <Button
                              aria-label="re order"
                              className="button"
                              title="order"
                              onClick={() => {
                                reoderHandler(
                                  order.id,
                                  order.orderref,
                                  order.vendorid,
                                );
                              }}
                            >
                              Reorder
                            </Button>
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
              {!loading && !favRestaurant && (
                <Typography>You don't have any favorite location</Typography>
              )}

              {!loading && favRestaurant && (
                <Grid container columns={16}>
                  <Grid item xs={16} sm={8} md={16} lg={16}>
                    <Typography variant="h5" title="Broadway Blvd">
                      {favRestaurant.name}
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
                      {favRestaurant.streetaddress}, {favRestaurant.zip}
                    </Typography>
                    <Typography variant="h6" title="San Diego, CA">
                      {favRestaurant.city}, {favRestaurant.state}
                    </Typography>
                    {favRestaurant.distance > 0 && (
                      <Typography variant="h6" title="distance">
                        {favRestaurant.distance} Miles Away
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={16} sm={8} md={16} lg={16}>
                    {favRestaurant.canpickup === true && (
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
                    {favRestaurant.supportscurbside === true && (
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

                    {favRestaurant.candeliver === true && (
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
