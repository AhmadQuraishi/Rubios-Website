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
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { ResponseRestaurant } from '../../types/olo-api';
import { QualificationCriteriaEnum } from '../../types/olo-api/olo-api.enums';
import { getSingleRestaurant } from '../../redux/actions/restaurant/fav-restaurant';
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
  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders(authtoken));
    dispatch(getSingleRestaurant(60854));
  }, []);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      setOrders(userRecentOrders.orders);
    }
  }, [userRecentOrders]);

  const favRest: ResponseRestaurant = {
    acceptsordersbeforeopening: false,
    acceptsordersuntilclosing: true,
    advanceonly: false,
    advanceorderdays: 14,
    allowhandoffchoiceatmanualfire: false,
    attributes: [],
    availabilitymessage: '',
    brand: 'rubios',
    calendars: undefined,
    candeliver: false,
    canpickup: true,
    city: 'New York',
    contextualpricing: null,
    country: 'US',
    crossstreet: '',
    customerfacingmessage: '',
    customfields: [
      {
        id: 141563,
        label: 'Make',
        qualificationcriteria:
          QualificationCriteriaEnum.CurbsidePickupOrdersOnly,
        required: true,
        validationregex: '',
      },
      {
        id: 141564,
        label: 'Model',
        qualificationcriteria:
          QualificationCriteriaEnum.CurbsidePickupOrdersOnly,
        required: true,
        validationregex: '',
      },
      {
        id: 141565,
        label: 'Color',
        qualificationcriteria:
          QualificationCriteriaEnum.CurbsidePickupOrdersOnly,
        required: true,
        validationregex: '',
      },
      {
        id: 147827,
        label: 'Table Number',
        qualificationcriteria: QualificationCriteriaEnum.DineInOrdersOnly,
        required: true,
        validationregex: '^[0-9]+$',
      },
    ],
    deliveryarea: '',
    deliverydelayalertenabled: false,
    deliverydelayalertmessage: 'null',
    deliveryfee: 0,
    deliveryfeetiers: [],
    distance: 0,
    extref: '123',
    hasolopass: false,
    id: 60854,
    isavailable: true,
    iscurrentlyopen: true,
    labels: [
      {
        key: 'handoffmode_delivery',
        value: 'Delivery',
      },
      {
        key: 'handoffmode_dispatch',
        value: 'Delivery',
      },
      {
        key: 'handoffmode_pickup',
        value: 'Pickup',
      },
      {
        key: 'handoffmode_curbside',
        value: 'Curbside',
      },
      {
        key: 'handoffmode_drivethru',
        value: 'Drive-thru',
      },
      {
        key: 'handoffmode_dinein',
        value: 'Dine In',
      },
      {
        key: 'manual_fire_label',
        value: 'Check-in',
      },
      {
        key: 'thanks_curbsidepickup_instructions',
        value:
          'Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online.',
      },
      {
        key: 'thanks_counterpickup_instructions',
        value:
          'Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online.',
      },
      {
        key: 'thanks_delivery_instructions',
        value: 'Thanks for your order!',
      },
      {
        key: 'thanks_dispatch_instructions',
        value: 'Thanks for your order!',
      },
      {
        key: 'thanks_drivethru_instructions',
        value:
          'Provide your name or order number to the attendant at drive-thru when you arrive.',
      },
      {
        key: 'thanks_dinein_instructions',
        value: 'Thanks for your order!',
      },
      {
        key: 'thanks_pickupinstructions',
        value:
          'Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online.',
      },
    ],
    latitude: 40.7052022,
    longitude: '-74.0131655',
    maximumpayinstoreorder: 0.0,
    metadata: [],
    minimumdeliveryorder: 0.0,
    minimumpickuporder: 0.0,
    mobileurl: 'https://rubios.olosandbox.com/menu/rubios-sandbox-demo-lab-1/',
    name: "Rubio's Sandbox Favorite Location",
    productrecipientnamelabel: 'Name:',
    requiresphonenumber: true,
    showcalories: true,
    slug: 'rubios-sandbox-demo-lab-1',
    specialinstructionsmaxlength: 10,
    state: 'NY',
    storename: "Rubio's",
    streetaddress: '26 Broadway',
    suggestedtippercentage: 20,
    supportedarrivalmessagehandoffmodes: [],
    supportedcardtypes: 'American Express/Discover/MasterCard/Visa',
    supportedcountries: ['US'],
    supportedtimemodes: ['advance', 'asap'],
    supportsbaskettransfers: true,
    supportscoupons: true,
    supportscurbside: true,
    supportsdinein: true,
    supportsdispatch: true,
    supportsdrivethru: false,
    supportsfeedback: true,
    supportsgrouporders: true,
    supportsguestordering: true,
    supportsloyalty: true,
    supportsmanualfire: false,
    supportsnationalmenu: false,
    supportsonlineordering: true,
    supportsproductrecipientnames: true,
    supportsspecialinstructions: false,
    supportssplitpayments: true,
    supportstip: true,
    telephone: '(505) 555-5555',
    url: 'https://rubios.olosandbox.com/menu/rubios-sandbox-demo-lab-1/',
    utcoffset: -5,
    zip: '07746',
  };
  const gotoCategoryPage = (e: BaseSyntheticEvent) => {
    const orderType = e.target.name;
    if (favRest && orderType != undefined) {
      dispatch(setResturantInfoRequest(favRest, orderType));
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
              {recentorders.length > 0 && (
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
              <Grid container columns={16}>
                <Grid item xs={16} sm={8} md={16} lg={16}>
                  <Typography
                    variant="caption"
                    className="label"
                    title="YOUR FAVORITE LOCATION"
                  >
                    YOUR FAVORITE LOCATION
                  </Typography>
                  <Typography variant="h5" title="Broadway Blvd">
                    {favRest.name}
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
                    {favRest.streetaddress}, {favRest.zip}
                  </Typography>
                  <Typography variant="h6" title="San Diego, CA">
                    {favRest.city}, {favRest.state}
                  </Typography>
                  {favRest.distance > 0 && (
                    <Typography variant="h6" title="distance">
                      {favRest.distance} Miles Away
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={16} sm={8} md={16} lg={16}>
                  {favRest.canpickup === true && (
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
                  {favRest.supportscurbside === true && (
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

                  {favRest.candeliver === true && (
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Welcome;
