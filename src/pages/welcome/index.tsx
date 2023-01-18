import { makeStyles } from '@mui/styles';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { displayToast } from '../../helpers/toast';
import WelcomeNewUser from '../../components/welcome/new-user';
import BgImage from '../../assets/imgs/20221028_RCG_Brand_5tacoLow_2393.jpg';
import BgImageNewUser from '../../assets/imgs/rubios-welcome-background.jpg';
import Page from '../../components/page-title';
import { getResturantListRequest } from '../../redux/actions/restaurant/list';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { OrderTypeDialog } from '../../components/order-type-dialog';
import { getUpsellsRequest } from '../../redux/actions/basket/upsell/Get';
import { isLoginUser } from '../../helpers/auth';

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(useLocation().search);
  const new_user = query.get('new_user');
  const [recentorders, setOrders] = useState([]);
  const [favRestaurant, setFavRestaurant] = useState<any>(null);
  const [pageBackground, setPageBackground] = useState(BgImage);
  const [isEdit, setIsEdit] = useState(false);
  const [isReoder, setIsReoder] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [deliverymode, setDeliveryMode] = useState('');
  const [restInfo, setRestInfo] = useState(false);
  const [isbasket, setIsbasket] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [body, setBody] = useState({
    id: '',
    ignoreunavailableproducts: true,
  });
  const [openOrder, setOpenOrder] = useState(false);

  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );
  const basketObj = useSelector((state: any) => state.basketReducer);
  const error = useSelector((state: any) => state.basketReducer.error);
  const { restaurants, loading: favloading } = useSelector(
    (state: any) => state.restaurantListReducer,
  );

  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  useEffect(() => {
    if (
      restaurants &&
      restaurants.restaurants &&
      restaurants.restaurants.length &&
      isLoginUser() &&
      providerToken?.favourite_store_numbers
    ) {
      const filter = restaurants.restaurants.filter(
        (rest: any) => rest.extref === providerToken?.favourite_store_numbers,
      );
      if (filter.length) {
        setFavRestaurant(filter[0]);
      }
    }
  }, [restaurants]);

  useEffect(() => {
    if (
      !favloading &&
      userRecentOrders &&
      userRecentOrders.orders &&
      !userRecentOrders.orders.length &&
      !favRestaurant
    ) {
      setNewUser(true);
    }
  }, [favloading, userRecentOrders, favRestaurant]);

  useEffect(() => {
    setPageBackground(new_user === 'true' ? BgImageNewUser : BgImage);
    if (
      new_user === 'true' &&
      userRecentOrders &&
      userRecentOrders.orders &&
      userRecentOrders.orders.length &&
      userRecentOrders.orders[0]
    ) {
      setNewUser(false);
    } else if (new_user === 'true') {
      setNewUser(true);
    } else {
      setNewUser(false);
    }

    if (new_user === 'true') {
      triggerFacebookEventOnNewRegsiter();
    }
  }, []);

  useEffect(() => {
    if (
      isLoginUser()
    ) {
    } else {
      navigate('/login');
    }
  }, [authToken, providerToken]);
  useEffect(() => {
    if (isLoginUser()) dispatch(getUserRecentOrders());
  }, [authToken]);
  useEffect(() => {
    if (
      isLoginUser() &&
      providerToken?.favourite_store_numbers &&
      providerToken?.favourite_store_numbers
    )
      dispatch(getResturantListRequest());
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

  const navigateAfterSuccess = () => {
    setOpenOrder(false);
    if (isReoder) {
      navigate('/checkout');
    }
    if (isEdit) {
      navigate(restaurant ? '/menu/' + restaurant.slug : '/');
      // handleCart();
    }
    displayToast(
      'SUCCESS',
      'The items from your recent order have been added to your cart.',
    );
    setIsEdit(false);
    setIsReoder(false);
    setIsbasket(false);
  };
  useEffect(() => {
    if (
      basketObj &&
      basketObj.basket &&
      basketObj.basket.products &&
      basketObj.basket.products.length > 0 &&
      isbasket
    ) {
      navigateAfterSuccess();
      // setOpenOrder(true);
      return;
    } else if (error && error.message) {
      setIsEdit(false);
      setIsReoder(false);
      setIsbasket(false);
    }
  }, [basketObj]);

  const gotoCategoryPage = (e: BaseSyntheticEvent) => {
    const orderType = e.target.name;
    if (favRestaurant && orderType) {
      let url =
        orderType === 'dispatch'
          ? '/location'
          : '/menu/' + favRestaurant.slug + '?handoff=' + orderType;
      dispatch(setResturantInfoRequest(favRestaurant, orderType));
      navigate(url);
    }
  };
  const reoderHandler = (vendorid: number) => {
    dispatch(getResturantInfoRequest(vendorid));
    dispatch(getUpsellsRequest(basketObj?.basket?.id, vendorid));
    setIsReoder(true);
    setIsRestaurant(true);
  };
  const editHandler = (vendorid: number) => {
    dispatch(getResturantInfoRequest(vendorid));
    setIsEdit(true);
    setIsRestaurant(true);
  };

  const triggerFacebookEventOnNewRegsiter = () => {
    let userObj: any = null;
    if (isLoginUser()) {
      userObj = {
        first_name: providerToken?.first_name || '',
        last_name: providerToken?.last_name || '',
        email: providerToken?.email || '',
        phone: providerToken?.phone || '',
      };
    }
    dispatch(
      facebookSendEvent(
        facebookConversionTypes.FACEBOOK_COMPLETE_REGISTER_EVENT,
        userObj,
        null,
      ),
    );
  };

  return (
    <Page title={'Welcome'} className="">
      <OrderTypeDialog
        type={'WELCOME'}
        openModal={openOrder}
        setOpenModal={(value: any) => {
          setOpenOrder(value);
        }}
      />
      <Fragment>
        <Grid
          style={{
            backgroundImage: `url(${pageBackground})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            justifyContent: 'center',
          }}
          container
          component="main"
          columns={16}
        >
          <Grid item xs={16} className="welcome-wrapper">
            <Grid container columns={16} className="welcome-content">
              <Grid
                item
                xs={16}
                sm={16}
                md={14}
                lg={9}
                className={newUser ? 'new-user-left-col' : 'left-col'}
              >
                <Typography variant="h2" className="label" title="Welcome">
                  {newUser ? 'CONGRATULATIONS!' : ''}
                </Typography>
                <Typography
                  variant="h1"
                  className="user-name"
                  title={
                    isLoginUser() &&
                    providerToken.first_name &&
                    providerToken.first_name
                  }
                >
                  {newUser ? "WELCOME TO RUBIO'S REWARDS" : 'WELCOME BACK'}{' '}
                  <br />
                  {isLoginUser() &&
                    newUser &&
                    providerToken?.first_name &&
                    `${providerToken?.first_name}!`}
                </Typography>
                {(loading && <CardSkeletonUI />) ||
                  (isEdit && <CardSkeletonUI />) ||
                  (isReoder && <CardSkeletonUI />)}

                {!loading &&
                  !newUser &&
                  userRecentOrders &&
                  userRecentOrders.orders &&
                  userRecentOrders.orders.length > 0 &&
                  isLoginUser() &&
                  !isEdit &&
                  !isReoder && (
                    <Fragment>
                      {userRecentOrders.orders
                        .slice(0, 1)
                        .map((order: any, index: number) => (
                          <Fragment key={index + order.id}>
                            <Typography variant="h2" className="label">
                              LAST ORDER {order.timeplaced.substr(4, 2)}/
                              {order.timeplaced.substr(6, 2)}
                            </Typography>
                            <Card
                              elevation={0}
                              className="p-card"
                              key={index + order.id}
                            >
                              <CardContent className="product-content">
                                {order.products
                                  .slice(0, 3)
                                  .map((product: any, index: number) => (
                                    <Fragment>
                                      {index == 2 &&
                                      order.products.length > 3 ? (
                                        <Typography
                                          variant="h6"
                                          sx={{fontFamily: "'Librefranklin-Regular' !important"}}
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
                                          sx={{fontFamily: "'Librefranklin-Regular' !important"}}
                                          key={product.name + product.quantity}
                                        >
                                          {product.quantity}x {product.name}
                                        </Typography>
                                      )}
                                    </Fragment>
                                  ))}
                                <Grid className="order-action">
                                  <Button
                                    className="caption-grey"
                                    title="EDIT ORDER"
                                    onClick={() => {
                                      editHandler(order.vendorid);
                                    }}
                                  >
                                    Edit Order
                                  </Button>
                                  <Button
                                    className="button"
                                    title="order"
                                    onClick={() => {
                                      reoderHandler(order.vendorid);
                                    }}
                                    onKeyPress={(e: any) => {
                                      if (e.key === 'Enter') {
                                        reoderHandler(order.vendorid);
                                      }
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
                  userRecentOrders &&
                  userRecentOrders.orders &&
                  userRecentOrders.orders.length === 0 &&
                  isLoginUser() &&
                  !newUser &&
                  !isEdit &&
                  !isReoder && (
                    <Typography>You don't have any recent orders</Typography>
                  )}
                {newUser && (
                  <>
                    <Typography variant={'h6'} style={{ marginBottom: 23 }}>
                      Begin your order to start earning rewards today!
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={10}
                      lg={10}
                      className="buttonset"
                    >
                      <Button
                        className="button setborder"
                        variant="contained"
                        title="ORDER NOW"
                        style={{ width: '100%' }}
                        onClick={() => {
                          navigate('/location');
                        }}
                      >
                        ORDER NOW
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
              <Grid
                item
                xs={16}
                sm={16}
                md={14}
                lg={5.5}
                className={newUser ? 'new-user-right-col' : 'right-col'}
              >
                <Typography
                  variant="h2"
                  className="label"
                  title="YOUR FAVORITE LOCATION"
                >
                  {newUser ? 'DOWNLOAD THE APP' : 'YOUR FAVORITE LOCATION'}
                </Typography>
                {!newUser ? (
                  <>
                    {(favloading && <CardSkeletonUI />) ||
                      (isEdit && <CardSkeletonUI />) ||
                      (isReoder && <CardSkeletonUI />)}
                    {!favloading &&
                      favRestaurant == null &&
                      !isEdit &&
                      !isReoder && (
                        <Typography>
                          You don't have any favorite location
                        </Typography>
                      )}

                    {!favloading && favRestaurant && !isEdit && !isReoder && (
                      <Grid container spacing={1} columns={16}>
                        <Grid
                          item
                          xs={16}
                          sm={8}
                          md={16}
                          lg={16}
                          className="res-info"
                        >
                          <Typography variant="h5" title={favRestaurant.name}>
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
                            sx={{    fontFamily: "'Librefranklin-Regular' !important"}}
                            title={`${favRestaurant.streetaddress}, ${favRestaurant.zip}`}
                          >
                            {favRestaurant.streetaddress}, {favRestaurant.zip}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{    fontFamily: "'Librefranklin-Regular' !important"}}
                            title={`${favRestaurant.city}, ${favRestaurant.state}`}
                          >
                            {favRestaurant.city}, {favRestaurant.state}
                          </Typography>
                          {favRestaurant.distance > 0 && (
                            <Typography
                              variant="h6"
                              title={`${favRestaurant.distance} Miles Away`}
                            >
                              {favRestaurant.distance} Miles Away
                            </Typography>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={16}
                          sm={8}
                          md={16}
                          lg={16}
                          className="action-btn"
                        >
                          <ul style={{ listStyle: 'none' }}>
                            {favRestaurant.canpickup === true && (
                              <li>
                                <Button
                                  aria-label="pickup button"
                                  variant="contained"
                                  title="PICK UP"
                                  name="pickup"
                                  onClick={gotoCategoryPage}
                                >
                                  PICK UP
                                </Button>
                              </li>
                            )}

                            {favRestaurant.supportscurbside === true && (
                              <li>
                                <Button
                                  aria-label="curbside button"
                                  variant="contained"
                                  title="CURBSIDE"
                                  name="curbside"
                                  onClick={gotoCategoryPage}
                                >
                                  CURBSIDE
                                </Button>
                              </li>
                            )}
                            {favRestaurant.supportsdinein === true && (
                              <li>
                                <Button
                                  aria-label="dinein button"
                                  variant="contained"
                                  title="DINE IN"
                                  name="dinein"
                                  onClick={gotoCategoryPage}
                                >
                                  DINE IN
                                </Button>
                              </li>
                            )}
                            {favRestaurant.supportsdispatch === true && (
                              <li>
                                <Button
                                  aria-label="delivery button"
                                  variant="contained"
                                  title="DELIVERY"
                                  name="dispatch"
                                  onClick={gotoCategoryPage}
                                >
                                  DELIVERY
                                </Button>
                              </li>
                            )}
                          </ul>
                        </Grid>
                      </Grid>
                    )}
                  </>
                ) : (
                  <WelcomeNewUser />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    </Page>
  );
};

export default Welcome;
