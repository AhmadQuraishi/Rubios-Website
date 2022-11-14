import { makeStyles } from '@mui/styles';
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  List,
  ListItem,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
  DialogContentText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Divider,

} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './welcome.css';
import React,{ BaseSyntheticEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import {
  getResturantInfoRequest,
  setResturantInfoRequest,
} from '../../redux/actions/restaurant';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import CardSkeletonUI from '../../components/card-skeleton-ui';
import { createBasketFromPrev } from '../../redux/actions/basket/create';
import { displayToast } from '../../helpers/toast';
import { handleCart } from '../../components/header';
import WelcomeNewUser from '../../components/welcome/new-user';
import BgImage from '../../assets/imgs/Family_Burrito_Box_mainA573LR.jpg';
import BgImageNewUser from '../../assets/imgs/rubios-welcome-background.jpg';
import Page from '../../components/page-title';
import { getResturantListRequest } from '../../redux/actions/restaurant/list';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import moment from 'moment';

import { Formik } from 'formik';
import * as Yup from 'yup';
const useStyle = makeStyles(() => ({
  root: {
    // background: `url(${BgImage}) center center fixed`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  caption: {},
}));

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(useLocation().search);
  const new_user = query.get('new_user');
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
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
  const [alignment, setAlignment] = React.useState('use-existing');
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
  // const { favRestaurant, favloading } = useSelector(
  //   (state: any) => state.favRestaurantReducer,
  // );
  const handleCloseOrder = () => {
    setOpenOrder(false);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const [addDeliveryAddress, setAddDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
    isdefault: false,
  });
  const handleChangeDelivery = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };  const checkButtonDisabled = (
    values: any,
    isValid: any,
    dirty: any,
    edit: any,
  ) => {
    if (edit) {
      return (
        values.address1 === '' ||
        values.city === '' ||
        values.zip === '' ||
        !isValid
      );
    } else {
      return (
        values.address1 === '' ||
        values.city === '' ||
        values.zip === '' ||
        !(isValid && dirty)
      );
    }
  };
  const [editDeliveryAddress, setEditDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
    isdefault: false,
  });
  const options = [
    { label: 'Pickup', id: 1 },
    { label: 'Curbside', id: 2 },
    { label: 'Delivery', id: 3 },
  ];

  
  useEffect(() => {
    if (
      restaurants &&
      restaurants.restaurants &&
      restaurants.restaurants.length &&
      providerToken &&
      providerToken.favourite_store_numbers
    ) {
      const filter = restaurants.restaurants.filter(
        (rest: any) => rest.extref === providerToken.favourite_store_numbers,
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
      providerToken &&
      authToken &&
      authToken.authtoken &&
      authToken.authtoken !== ''
    ) {
    } else {
      navigate('/login');
    }
  }, [authToken, providerToken]);
  useEffect(() => {
    if (authToken && authToken.authtoken) dispatch(getUserRecentOrders());
  }, [authToken]);
  useEffect(() => {
    if (
      providerToken &&
      providerToken.favourite_store_numbers &&
      providerToken.favourite_store_numbers
    )
      dispatch(getResturantListRequest());
    // dispatch(getFavRestaurant(providerToken.favourite_store_numbers));
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

  const handleClickOpenOrder = () => {
    setOpenOrder(true);
  };
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
      displayToast(
        'SUCCESS',
        'The items from your recent order have been added to your cart.',
      );
      setIsEdit(false);
      setIsReoder(false);
      setIsbasket(false);
    } else if (error && error.message) {
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

  const triggerFacebookEventOnNewRegsiter = () => {
    let userObj: any = null;
    if (providerToken) {
      userObj = {
        first_name: providerToken.first_name || '',
        last_name: providerToken.last_name || '',
        email: providerToken.email || '',
        phone: providerToken.phone || '',
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
                <Dialog
            open={openOrder}
            onClose={handleCloseOrder}
            aria-labelledby="modal-dialog-delivery-address"
            aria-describedby="modal-dialog-delivery-address-form"
            sx={{ width: '100%' }}
            TransitionProps={{
              role: 'dialog',
              'aria-modal': 'true',
              'aria-label': `Change Order Type`,
            }}
          >
            <DialogTitle id="modal-dialog-delivery-title">
              {`Edit Address`}
            </DialogTitle>
            <Formik
              initialValues={{
                address1: addDeliveryAddress && addDeliveryAddress.address1,
                address2: addDeliveryAddress && addDeliveryAddress.address2,
                city: addDeliveryAddress && addDeliveryAddress.city,
                zip: addDeliveryAddress && addDeliveryAddress.zip,
                isdefault: false,
              }}
              validationSchema={Yup.object({
                address1: Yup.string()
                  .trim()
                  .max(40, 'Must be 40 characters or less')
                  .min(3, 'Must be at least 3 characters')
                  .required('Street address is required'),
                address2: Yup.string()
                  .trim()
                  .max(40, 'Must be 30 characters or less'),
                city: Yup.string()
                  .trim()
                  .max(40, 'Must be 40 characters or less')
                  .min(3, 'Must be at least 3 characters')
                  .required('City is required'),
                zip: Yup.string()
                  .trim()
                  .min(3, 'Must be at least 3 digits')
                  .max(5, 'Must be at most 5 digits')
                  .matches(
                    /^[0-9\s]+$/,
                    'Only numbers are allowed for this field ',
                  )
                  .required('Postal code is required'),
                isdefault: Yup.boolean(),
              })}
              onSubmit={async (values) => { }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                isValid,
                dirty,
              }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent sx={{ padding: "0px 24px !important", textAlign: "center", }}>
                    <DialogTitle id="modal-dialog-delivery-title">
                      {`Order Type`}
                    </DialogTitle>
                    <Grid>
                      <Autocomplete
                        disablePortal
                        // id="combo-box-demo"
                        options={options}
                        sx={{ width: "100%", top: "0px !important" }}
                        renderInput={(params) => <TextField {...params} label={"Order Type"} />}
                      />
                    </Grid>
                    <br />
                    <Divider />
                  </DialogContent>
                  <DialogContent sx={{ padding: "0px 24px !important", textAlign: "center", }}>
                    <DialogTitle id="modal-dialog-delivery-title">
                      {`Delivery Address`}
                    </DialogTitle>
                    <Grid>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChangeDelivery}
                        aria-label="Use Existing"
                      >
                        <ToggleButton value="use-existing" sx={{ padding: { xs: "0px 22px", sm: "0px 61px", md: "0px 61px", lg: "0px 61px" } }}>Use Existing</ToggleButton>
                        <ToggleButton value="add-new" sx={{ padding: { xs: "0px 22px", lg: "0px 61px", md: "0px 61px", sm: "0px 61px" } }}>Add New</ToggleButton>
                      </ToggleButtonGroup>
                    </Grid>
                    <br />
                    <Divider />
                  </DialogContent>

                  {alignment === "use-existing" &&
                    <DialogContent>
                      <DialogContentText id="Modal-dialog-delivery-description">
                        <Grid container sx={{ width: '100%', maxWidth: '450px' }}>
                          <Grid item xs={12}>
                            <TextField
                              aria-label="Address"
                              label="Street Address"
                              title="Street Address"
                              type="text"
                              name="address1"
                              autoComplete="off"
                              sx={{ width: '100%' }}
                              value={values.address1}
                              onChange={handleChange('address1')}
                              onBlur={handleBlur('address1')}
                              error={Boolean(touched.address1 && errors.address1)}
                              helperText={touched.address1 && errors.address1}
                            />
                          </Grid>
                        </Grid>
                      </DialogContentText>
                    </DialogContent>
                  }

                  <br />
                  {alignment === "use-existing" &&
                    <DialogTitle id="modal-dialog-delivery-title" sx={{ fontSize: "14px", padding: "0px 24px !important", textAlign: "center", }}>
                      {`Address Details`}
                    </DialogTitle>
                  }
                  {alignment === "add-new" &&
                    <DialogTitle id="modal-dialog-delivery-title" sx={{ fontSize: "14px", padding: "0px 24px !important", textAlign: "center", }}>
                      {`Add Address Details`}
                    </DialogTitle>
                  }
                  <DialogContent >

                    <DialogContentText id="Modal-dialog-delivery-description">
                      <Grid container sx={{ width: '100%', maxWidth: '450px' }}>


                        <Grid item xs={12}>
                          <TextField
                            aria-label="Address"
                            label="Street Address"
                            title="Street Address"
                            type="text"
                            name="address1"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.address1}
                            onChange={handleChange('address1')}
                            onBlur={handleBlur('address1')}
                            error={Boolean(touched.address1 && errors.address1)}
                            helperText={touched.address1 && errors.address1}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                          <TextField
                            aria-label="Apt, Floor, Suite, Building, Company Address - Optional"
                            label="Apt, Floor, Suite, Building, Company Address - Optional"
                            title="Apt, Floor, Suite, Building, Company Address - Optional"
                            type="text"
                            name="address2"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.address2}
                            onChange={handleChange('address2')}
                            onBlur={handleBlur('address2')}
                            error={Boolean(touched.address2 && errors.address2)}
                            helperText={touched.address2 && errors.address2}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                          <TextField
                            aria-label="City"
                            label="City"
                            title="City"
                            type="text"
                            name="city"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.city}
                            onChange={handleChange('city')}
                            onBlur={handleBlur('city')}
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                          <TextField
                            aria-label="Postal Code"
                            label="Postal Code"
                            title="Postal Code"
                            type="text"
                            name="zip"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.zip}
                            onChange={handleChange('zip')}
                            onBlur={handleBlur('zip')}
                            error={Boolean(touched.zip && errors.zip)}
                            helperText={touched.zip && errors.zip}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.isdefault}
                                  onChange={handleChange('isdefault')}
                                />
                              }
                              label="Make default delivery address."
                              aria-label="Make default delivery address"
                              aria-required="true"
                              title="Make default delivery address"
                              name="isdefault"
                              className="size"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      sx={{ marginBottom: '15px' }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        setAddDeliveryAddress({
                          address1: values.address1 || '',
                          address2: values.address2 || '',
                          city: values.city || '',
                          zip: values.zip || '',
                          isdefault: values.isdefault,
                        });
                        // handleLCloseConfirm(
                        //   {
                        //     address1: values.address1 || '',
                        //     address2: values.address2 || '',
                        //     city: values.city || '',
                        //     zip: values.zip || '',
                        //     isdefault: values.isdefault,
                        //   },
                        //   null,
                        // );
                      }}
                      sx={{ marginRight: '15px', marginBottom: '15px' }}
                      autoFocus
                      disabled={checkButtonDisabled(
                        values,
                        isValid,
                        dirty,
                        edit,
                      )}
                    >
                      {edit ? 'Confirm' : 'Add'} Address
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Dialog>
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
                    providerToken &&
                    providerToken.first_name &&
                    providerToken.first_name
                  }
                >
                  {newUser ? "WELCOME TO RUBIO'S REWARDS" : 'WELCOME BACK'}{' '}
                  <br />
                  {providerToken &&
                    newUser &&
                    providerToken.first_name &&
                    `${providerToken.first_name}!`}
                </Typography>
                {(loading && <CardSkeletonUI />) ||
                  (isEdit && <CardSkeletonUI />) ||
                  (isReoder && <CardSkeletonUI />)}

                {!loading &&
                  !newUser &&
                  userRecentOrders &&
                  userRecentOrders.orders &&
                  userRecentOrders.orders.length > 0 &&
                  authToken &&
                  authToken.authtoken &&
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
                              {/* <CardMedia
                                component="img"
                                title="image"
                                aria-label="Recent Order Image Icon"
                                image={require('../../assets/imgs/order-hidtory-icon.png')}
                                alt=""
                                className="order-img"
                              /> */}
                              <CardContent className="product-content">
                                {order.products
                                  .slice(0, 3)
                                  .map((product: any, index: number) => (
                                    <Fragment>
                                      {index == 2 &&
                                      order.products.length > 3 ? (
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
                                    // onClick={() => {
                                    //   reoderHandler(order.vendorid);
                                    // }}
                                    onKeyPress={(e: any) => {
                                      if (e.key === 'Enter') {
                                        handleClickOpenOrder();
                                      }
                                    }}
                                    onClick={() => handleClickOpenOrder()}
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
                  authToken &&
                  authToken.authtoken &&
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
                            title={`${favRestaurant.streetaddress}, ${favRestaurant.zip}`}
                          >
                            {favRestaurant.streetaddress}, {favRestaurant.zip}
                          </Typography>
                          <Typography
                            variant="h6"
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
                                  title="PICKUP"
                                  name="pickup"
                                  onClick={gotoCategoryPage}
                                >
                                  PICKUP
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
