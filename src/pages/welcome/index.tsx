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
import { BaseSyntheticEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import {
  getResturantInfoRequest,
  setResturantInfoRequest,
} from '../../redux/actions/restaurant';

import CardSkeletonUI from '../../components/card-skeleton-ui';
import { createBasketFromPrev } from '../../redux/actions/basket/create';
import { getFavRestaurant } from '../../redux/actions/restaurant/fav-restaurant';
import { displayToast } from '../../helpers/toast';
import { handleCart } from '../../components/header';
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
  const [isError, setIserror] = useState(false);
  const [isReoder, setIsReoder] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [deliverymode, setDeliveryMode] = useState('');
  const [restInfo, setRestInfo] = useState(false);
  const [isbasket, setIsbasket] = useState(false);
  const [body, setBody] = useState({
    id: '',
    ignoreunavailableproducts: true,
  });
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );
  const basketObj = useSelector((state: any) => state.basketReducer);
  const error = useSelector((state: any) => state.basketReducer.error);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { favRestaurant, favloading } = useSelector(
    (state: any) => state.favRestaurantReducer,
  );
  useEffect(() => {
    if (authToken && authToken.authtoken) dispatch(getUserRecentOrders());
  }, [authToken]);
  useEffect(() => {
    if (
      providerToken &&
      providerToken.favourite_store_numbers &&
      providerToken.favourite_store_numbers
    )
      dispatch(getFavRestaurant(providerToken.favourite_store_numbers));
  }, []);
  useEffect(() => {
    if (
      userRecentOrders &&
      userRecentOrders.orders &&
      userRecentOrders.orders[0]
    ) {
      setOrders(userRecentOrders.orders);
      setDeliveryMode(userRecentOrders.orders[0].deliverymode);
      setBody({
        id: userRecentOrders.orders[0].id,
        ignoreunavailableproducts: true,
      });
    }
  }, [userRecentOrders]);
  useEffect(() => {
    if (isRestaurant) {
      dispatch(setResturantInfoRequest(restaurant, deliverymode));
      setRestInfo(true);
      setIsRestaurant(false);
    }
    if (restInfo) {
      dispatch(createBasketFromPrev(body));
      setRestInfo(false);
      setIsbasket(true);
    }
  }, [restaurant, orderType]);

  useEffect(() => {
    if (
      basketObj &&
      basketObj.basket &&
      basketObj.basket.products &&
      basketObj.basket.products.length > 0 &&
      isbasket
    ) {
      if (isReoder) {
        navigate('/checkout');
      }
      if (isEdit) {
        navigate(restaurant ? '/menu/' + restaurant.slug : '/');
        handleCart();
      }
      displayToast('SUCCESS', 'Recent order is added in cart');
      setIsEdit(false);
      setIsReoder(false);
      setIsbasket(false);
    }
  }, [basketObj]);

  const gotoCategoryPage = (e: BaseSyntheticEvent) => {
    const orderType = e.target.name;
    if (favRestaurant && orderType != undefined) {
      dispatch(setResturantInfoRequest(favRestaurant, orderType));
      navigate(favRestaurant ? '/menu/' + favRestaurant.slug : '/');
    }
  };
  const reoderHandler = (vendorid: number) => {
    dispatch(getResturantInfoRequest(vendorid));
    setIsReoder(true);
    setIsRestaurant(true);
  };
  const editHandler = (vendorid: number) => {
    dispatch(getResturantInfoRequest(vendorid));
    setIsEdit(true);
    setIsRestaurant(true);
  };

  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid item xs={16} className="welcome-wrapper">
          <Grid container columns={16} className="welcome-content">
            <Grid item xs={16} sm={16} md={14} lg={9} className="left-col">
              <Typography variant="caption" className="label" title="Welcome">
                WELCOME
              </Typography>
              <Typography
                variant="h4"
                title={
                  providerToken &&
                  providerToken.first_name &&
                  providerToken.first_name
                }
              >
                WELCOME BACK {' '}
                {providerToken &&
                  providerToken.first_name &&
                  providerToken.first_name}
                !
              </Typography>
              {(loading && <CardSkeletonUI />) ||
                (isEdit == true && <CardSkeletonUI />) ||
                (isReoder == true && <CardSkeletonUI />)}

              {!loading &&
                userRecentOrders &&
                userRecentOrders.orders &&
                userRecentOrders.orders.length > 0 &&
                isEdit == false &&
                isReoder == false && (
                  <Fragment>
                    {userRecentOrders.orders
                      .slice(0, 1)
                      .map((order: any, index: number) => (
                        <Fragment key={index + order.id}>
                          <Typography
                            variant="caption"
                            className="label"
                            title="LAST ORDER 11/01"
                          >
                            LAST ORDER {order.timeplaced.substr(6, 2)}/
                            {order.timeplaced.substr(4, 2)}
                          </Typography>
                          <Card
                            elevation={0}
                            className="p-card"
                            key={index + order.id}
                          >
                            <CardMedia
                              component="img"
                              title="image"
                              image={require('../../assets/imgs/order-hidtory-icon.png')}
                              alt="image"
                              className="order-img"
                            />
                            <CardContent className="product-content">
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
                                    editHandler(order.vendorid);
                                  }}
                                >
                                  Edit Order
                                </Button>
                                <Button
                                  aria-label="re order"
                                  className="button"
                                  title="order"
                                  onClick={() => {
                                    reoderHandler(order.vendorid);
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
              {!loading &&
                userRecentOrders === null &&
                isEdit == false &&
                isReoder == false && (
                  <Typography>You don't have any recent orders</Typography>
                )}
            </Grid>
            <Grid item xs={16} sm={16} md={14} lg={5.5} className="right-col">
              <Typography
                variant="caption"
                className="label"
                title="YOUR FAVORITE LOCATION"
              >
                YOUR FAVORITE LOCATION
              </Typography>
              {(favloading && <CardSkeletonUI />) ||
                (isEdit === true && <CardSkeletonUI />) ||
                (isReoder === true && <CardSkeletonUI />)}
              {!favloading &&
                favRestaurant == null &&
                isEdit == false &&
                isReoder == false && (
                  <Typography>You don't have any favorite location</Typography>
                )}

              {!favloading &&
                favRestaurant &&
                isEdit == false &&
                isReoder == false && (
                  <Grid container spacing={1} columns={16}>
                    <Grid
                      item
                      xs={16}
                      sm={8}
                      md={16}
                      lg={16}
                      className="res-info"
                    >
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
                      {favRestaurant.candeliver === true && (
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

                      {favRestaurant.supportscurbside === true && (
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
