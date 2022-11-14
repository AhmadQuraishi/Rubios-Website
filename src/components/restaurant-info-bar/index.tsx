import {
  Grid,
  Typography,
  useTheme,
  List,
  ListItem,
  Button,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
  DialogContentText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Divider,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
// import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResturantCalendarRequest } from '../../redux/actions/restaurant/calendar';
import { ResponseRestaurant } from '../../types/olo-api';
import { GetUserFriendlyHoursRAW } from '../../helpers/getUserFriendlyHours';
import { HoursListing } from '../../helpers/hoursListing';
import { CalendarTypeEnum } from '../../helpers/hoursListing';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DialogBox from '../dialog-box';
import { resetBasketRequest } from '../../redux/actions/basket';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { updateUser } from '../../redux/actions/user';
import { getSingleLocation } from '../../redux/actions/location';
import './index.css';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
const useStyle = makeStyles({
  heading: {
    fontSize: '13px !important',
    color: '#fff',
    fontFamily: 'Poppins-Medium !important',
  },
});

const StoreInfoBar = () => {
  const theme = useTheme();
  const classes = useStyle();
  const [addDeliveryAddress, setAddDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
    isdefault: false,
  });
  // const [editDeliveryAddress, setEditDeliveryAddress] = useState({
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   zip: '',
  //   isdefault: false,
  // });
  const options = [
    { label: 'Pickup', id: 1 },
    { label: 'Curbside', id: 2 },
    { label: 'Delivery', id: 3 },
  ];
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.down('lg'));
  const [restaurantInfo, setRestaurantInfo] = useState<ResponseRestaurant>();
  const [restaurantHours, setRestaurantHours] = useState<HoursListing[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [edit, setEdit] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { calendar } = useSelector(
    (state: any) => state.restaurantCalendarReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const [alignment, setAlignment] = React.useState('use-existing');
  const { singleLocation } = useSelector((state: any) => state.locationReducer);
  const dispatch = useDispatch();

  const getTimeFormat = (date: string) => {
    return moment(date, 'YYYYMMDD HH:mm').format('h:mm A');
  };

  useEffect(() => {
    if (singleLocation?.data?.length) {
      setLocationId(singleLocation.data[0].location_id);
    }
  }, [singleLocation]);

  useEffect(() => {
    if (restaurant) {
      setRestaurantInfo(restaurant);
      if (restaurant?.extref) {
        dispatch(getSingleLocation(restaurant.extref));
      }
    }
  }, [restaurant]);

  const checkButtonDisabled = (
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
  useEffect(() => {
    if (restaurantInfo) {
      var today = new Date();
      const dateFrom =
        today.getFullYear() * 1e4 +
        (today.getMonth() + 1) * 100 +
        today.getDate() +
        '';
      const lastWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 6,
      );
      const dateTo =
        lastWeekDate.getFullYear() * 1e4 +
        (lastWeekDate.getMonth() + 1) * 100 +
        lastWeekDate.getDate() +
        '';
      dispatch(
        getResturantCalendarRequest(restaurantInfo.id, dateFrom, dateTo),
      );
    }
  }, [restaurantInfo]);

  useEffect(() => {
    if (calendar) {
      setRestaurantHours(
        GetUserFriendlyHoursRAW(calendar, CalendarTypeEnum.business),
      );
    }
  }, [calendar]);

  const showHideFunc = () => {
    if (!isMobile) {
      return true;
    } else if (showMore) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeDelivery = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const handleDeleteFunction = () => {
    setOpen(false);
    dispatch(resetBasketRequest());
    dispatch(setResturantInfoRequest(null, ''));
    setTimeout(() => {
      window.location.href = '/location';
    }, 500);
  };
  const handleCloseOrder = () => {
    setOpenOrder(false);
  };

  const handleClickOpenOrder = () => {
    setOpenOrder(true);
  };
  const AddToFavourites = () => {
    if (checkFavorite()) {
      return;
    }
    if (locationId) {
      const obj = {
        favourite_location_ids: locationId,
      };
      dispatch(updateUser(obj, false));
    }
  };

  const checkFavorite = () => {
    let check = false;
    if (providerToken && providerToken.favourite_store_numbers && restaurant) {
      if (providerToken.favourite_store_numbers === restaurant.extref) {
        check = true;
      }
    }
    return check;
  };

  return (
    <>
      {restaurantInfo && (
        <Grid
          container
          spacing={0}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: { xs: '30px 20px', sm: '35px 40px', lg: '20px 100px' },
          }}
        >
          <DialogBox
            open={open}
            handleClose={handleClose}
            message={
              'If you change location, your selected items will be removed from your basket, and you will have to choose the items again. Are you sure you want to change locations?'
            }
            handleDeleteFunction={() => handleDeleteFunction()}
          />
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
              onSubmit={async (values) => {}}
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
                  <DialogContent
                    sx={{ padding: '0px 24px !important', textAlign: 'center' }}
                  >
                    <DialogTitle id="modal-dialog-delivery-title">
                      {`Order Type`}
                    </DialogTitle>
                    <Grid>
                      <Autocomplete
                        disablePortal
                        // id="combo-box-demo"
                        options={options}
                        sx={{ width: '100%', top: '0px !important' }}
                        renderInput={(params) => (
                          <TextField {...params} label={'Order Type'} />
                        )}
                      />
                    </Grid>
                    <br />
                    <Divider />
                  </DialogContent>
                  <DialogContent
                    sx={{ padding: '0px 24px !important', textAlign: 'center' }}
                  >
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
                        <ToggleButton
                          value="use-existing"
                          sx={{
                            padding: {
                              xs: '0px 22px',
                              sm: '0px 61px',
                              md: '0px 61px',
                              lg: '0px 61px',
                            },
                          }}
                        >
                          Use Existing
                        </ToggleButton>
                        <ToggleButton
                          value="add-new"
                          sx={{
                            padding: {
                              xs: '0px 22px',
                              lg: '0px 61px',
                              md: '0px 61px',
                              sm: '0px 61px',
                            },
                          }}
                        >
                          Add New
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Grid>
                    <br />
                    <Divider />
                  </DialogContent>

                  {alignment === 'use-existing' && (
                    <DialogContent>
                      <DialogContentText id="Modal-dialog-delivery-description">
                        <Grid
                          container
                          sx={{ width: '100%', maxWidth: '450px' }}
                        >
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
                              error={Boolean(
                                touched.address1 && errors.address1,
                              )}
                              helperText={touched.address1 && errors.address1}
                            />
                          </Grid>
                        </Grid>
                      </DialogContentText>
                    </DialogContent>
                  )}

                  <br />
                  {alignment === 'use-existing' && (
                    <DialogTitle
                      id="modal-dialog-delivery-title"
                      sx={{
                        fontSize: '14px',
                        padding: '0px 24px !important',
                        textAlign: 'center',
                      }}
                    >
                      {`Address Details`}
                    </DialogTitle>
                  )}
                  {alignment === 'add-new' && (
                    <DialogTitle
                      id="modal-dialog-delivery-title"
                      sx={{
                        fontSize: '14px',
                        padding: '0px 24px !important',
                        textAlign: 'center',
                      }}
                    >
                      {`Add Address Details`}
                    </DialogTitle>
                  )}
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
          <Grid item xs={12}>
            <Grid container spacing={0} margin="auto">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  paddingRight: { xs: '0px', sm: '15px' },
                  paddingBottom: { xs: '0px', sm: '0px' },
                }}
              >
                <Typography
                  className={classes.heading}
                  variant="h2"
                  textTransform="uppercase"
                  title="Pick Up From"
                >
                  {orderType && orderType == 'dispatch' && 'Delivered From'}
                  {orderType && orderType == 'dinein' && 'Dine In At'}
                  {orderType &&
                    (orderType == 'pickup' || orderType == 'curbside') &&
                    'Pick Up From'}
                </Typography>
                <Typography
                  variant="h2"
                  color="#fff"
                  textTransform="uppercase"
                  fontWeight={700}
                  lineHeight={1.3}
                  fontFamily="Poppins-Bold !important"
                  sx={{
                    fontSize: {
                      xs: '30px !important',
                      sm: '35px !important',
                      lg: '40px !important',
                    },
                  }}
                  title={restaurantInfo.name}
                >
                  {restaurantInfo.name}
                </Typography>
              </Grid>
              {isMobile && (
                <Grid
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  role={'button'}
                  tabIndex={0}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      setShowMore(!showMore);
                    }
                  }}
                  aria-label={`${showMore ? 'Hide' : 'View'} Details`}
                  xs={12}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '13px',
                      fontWeight: '500',
                      fontFamily: 'Poppins-Medium !important',
                      color: '#fff',
                      display: 'inline',
                    }}
                  >
                    {showMore ? 'Hide' : 'View'} Details
                  </Typography>
                  {showMore ? (
                    <ExpandLessIcon style={{ color: '#fff' }} />
                  ) : (
                    <ExpandMoreIcon style={{ color: '#fff' }} />
                  )}
                </Grid>
              )}

              {showHideFunc() && (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                      paddingRight: {
                        xs: '0px',
                        sm: '15px',
                        md: '20px',
                        lg: '20px',
                      },
                      paddingBottom: { xs: '15px', sm: '0px' },
                      paddingTop: { xs: '15px', sm: '0px' },
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      className={classes.heading}
                      variant="h2"
                      textTransform="uppercase"
                      title="Address"
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                    >
                      Address
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#fff"
                      component="div"
                      textTransform="uppercase"
                      fontSize={11}
                      paddingTop="8px"
                      title={`${restaurantInfo.streetaddress}, ${restaurantInfo.city}, ${restaurantInfo.state}`}
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                    >
                      <p style={{ paddingBottom: '2px' }}>
                        {restaurantInfo.streetaddress}
                      </p>
                      <p style={{ paddingBottom: '2px' }}>
                        {restaurantInfo.city}, {restaurantInfo.state}
                      </p>
                      {restaurantInfo.distance > 0 && (
                        <p>{restaurantInfo.distance.toFixed(2)} Miles Away</p>
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#fff"
                      fontSize={11}
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                    >
                      <p
                        style={{
                          cursor: 'pointer',
                          textDecorationLine: 'underline',
                        }}
                        role={'button'}
                        aria-label={'Change Order Type'}
                        tabIndex={0}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            handleClickOpenOrder();
                          }
                        }}
                        onClick={() => handleClickOpenOrder()}
                      >
                        Change Order Type
                      </p>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#fff"
                      fontSize={11}
                      sx={{
                        marginTop: '22px',
                        display: {
                          xs: 'none',
                          sm: 'block',
                          md: 'block',
                          lg: 'block',
                        },
                      }}
                    >
                      <p
                        style={{
                          cursor: 'pointer',
                          textDecorationLine: 'underline',
                          fontSize: '13px',
                        }}
                        role={'button'}
                        aria-label={'Change Order Type'}
                        tabIndex={0}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            handleClickOpenOrder();
                          }
                        }}
                        onClick={() => handleClickOpenOrder()}
                      >
                        Change Order Type
                      </p>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#fff"
                      fontSize={11}
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                    >
                      <p
                        style={{
                          cursor: 'pointer',
                          textDecorationLine: 'underline',
                        }}
                        role={'button'}
                        aria-label={'Change location'}
                        tabIndex={1}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            handleClickOpen();
                          }
                        }}
                        onClick={() => handleClickOpen()}
                      >
                        Change location
                      </p>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#fff"
                      fontSize={11}
                      sx={{
                        marginTop: '5px',
                        display: {
                          xs: 'none',
                          sm: 'block',
                          md: 'block',
                          lg: 'block',
                        },
                      }}
                    >
                      <p
                        style={{
                          cursor: 'pointer',
                          textDecorationLine: 'underline',
                          fontSize: '13px',
                        }}
                        role={'button'}
                        aria-label={'Change location'}
                        tabIndex={1}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            handleClickOpen();
                          }
                        }}
                        onClick={() => handleClickOpen()}
                      >
                        Change location
                      </p>
                    </Typography>
                    {providerToken &&
                      authToken &&
                      authToken.authtoken &&
                      authToken.authtoken !== '' && (
                        <Typography
                          variant="body2"
                          color="#fff"
                          fontSize={11}
                          sx={{
                            display: {
                              xs: 'inline',
                              sm: 'inline',
                              md: 'inline',
                              lg: 'inline',
                            },
                          }}
                        >
                          <p
                            style={{
                              cursor: checkFavorite() ? 'inherit' : 'pointer',
                              textDecorationLine: checkFavorite()
                                ? 'none'
                                : 'underline',
                            }}
                            className={'add-favourite'}
                            role={'button'}
                            aria-label={'Add to Favorites'}
                            tabIndex={0}
                            onKeyPress={(e: any) => {
                              if (e.key === 'Enter') {
                                AddToFavourites();
                              }
                            }}
                            onClick={() => AddToFavourites()}
                          >
                            {checkFavorite() ? 'Favorite' : 'Add to Favorites'}
                            {checkFavorite() ? (
                              <FavoriteIcon
                                sx={{
                                  fontSize: '15px',
                                  marginLeft: '3px',
                                  display: {
                                    xs: 'inline',
                                    sm: 'inline',
                                    md: 'inline',
                                    lg: 'inline',
                                  },
                                }}
                              />
                            ) : (
                              <FavoriteBorderIcon
                                sx={{
                                  fontSize: '15px',
                                  marginLeft: '3px',
                                  display: {
                                    xs: 'inline',
                                    sm: 'inline',
                                    md: 'inline',
                                    lg: 'inline',
                                  },
                                }}
                              />
                            )}
                          </p>
                        </Typography>
                      )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                      flexDirection: 'column',
                      paddingTop: { xs: '5px', sm: '0px' },
                    }}
                  >
                    <Typography
                      className={classes.heading}
                      variant="h2"
                      textTransform="uppercase"
                      title="Hours"
                      sx={{
                        paddingBottom: '5px',
                      }}
                    >
                      Hours
                    </Typography>
                    {restaurantHours &&
                      restaurantHours.length > 0 &&
                      restaurantHours.map((item: any, index: number) => (
                        <Grid
                          container
                          spacing={0}
                          key={index}
                          sx={{
                            display: {
                              xs: 'flex',
                              sm: 'none',
                              md: 'none',
                              lg: 'none',
                            },
                          }}
                        >
                          <Grid item xs={3}>
                            <List
                              sx={{
                                padding: '2px 0 0 0',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: 'background.paper',
                              }}
                              role="presentation"
                            >
                              <ListItem
                                sx={{
                                  padding: '0 0 0 0',
                                  fontFamily: "'Poppins-Medium' !important",
                                }}
                                title={
                                  (item.weekday &&
                                    item.weekday.toUpperCase()) ||
                                  ''
                                }
                              >
                                {(item.weekday && item.weekday.toUpperCase()) ||
                                  ''}
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item xs={9}>
                            <List
                              sx={{
                                padding: '2px 0 0 0',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'background.paper',
                                fontFamily: "'Poppins-Medium' !important",
                              }}
                              role="presentation"
                            >
                              <ListItem
                                sx={{
                                  padding: '0 0 0 0',
                                }}
                                title={
                                  item.isOpenAllDay
                                    ? 'Open 24 hours'
                                    : getTimeFormat(item.start) +
                                      ' - ' +
                                      getTimeFormat(item.end)
                                }
                              >
                                {item.isOpenAllDay
                                  ? 'Open 24 hours'
                                  : getTimeFormat(item.start) +
                                    ' - ' +
                                    getTimeFormat(item.end)}
                              </ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      ))}
                    <>
                      {restaurantHours &&
                        restaurantHours.length > 0 &&
                        restaurantHours
                          .slice(0, 1)
                          .map((item: any, index: number) => (
                            <Grid
                              container
                              spacing={0}
                              key={index}
                              sx={{
                                display: {
                                  xs: 'none',
                                  sm: 'flex',
                                  md: 'flex',
                                  lg: 'flex',
                                },
                              }}
                            >
                              <Grid item xs={3}>
                                <List
                                  sx={{
                                    padding: '2px 0 0 0',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'background.paper',
                                  }}
                                  role="presentation"
                                >
                                  <ListItem
                                    sx={{
                                      padding: '0 0 0 0',
                                      fontFamily: "'Poppins-Medium' !important",
                                    }}
                                    title={
                                      (item.weekday &&
                                        item.weekday.toUpperCase()) ||
                                      ''
                                    }
                                  >
                                    {(item.weekday &&
                                      item.weekday.toUpperCase()) ||
                                      ''}
                                  </ListItem>
                                </List>
                              </Grid>
                              <Grid item xs={9}>
                                <List
                                  sx={{
                                    padding: '2px 0 0 0',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    color: 'background.paper',
                                    fontFamily: "'Poppins-Medium' !important",
                                  }}
                                  role="presentation"
                                >
                                  <ListItem
                                    sx={{
                                      padding: '0 0 0 0',
                                    }}
                                    title={
                                      item.isOpenAllDay
                                        ? 'Open 24 hours'
                                        : getTimeFormat(item.start) +
                                          ' - ' +
                                          getTimeFormat(item.end)
                                    }
                                  >
                                    {item.isOpenAllDay
                                      ? 'Open 24 hours'
                                      : getTimeFormat(item.start) +
                                        ' - ' +
                                        getTimeFormat(item.end)}
                                  </ListItem>
                                </List>
                              </Grid>
                            </Grid>
                          ))}
                      <Grid
                        sx={{
                          marginTop: '4px',
                          display: {
                            xs: 'none',
                            sm: 'block',
                            md: 'block',
                            lg: 'block',
                          },
                        }}
                        onClick={() => {
                          setShowMore(!showMore);
                        }}
                        item
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        role={'button'}
                        tabIndex={0}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            setShowMore(!showMore);
                          }
                        }}
                        aria-label={`${showMore ? 'Hide' : 'View'} Details`}
                        xs={12}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '13px',
                            fontWeight: '500',
                            fontFamily: 'Poppins-Medium !important',
                            color: '#fff',
                            // display: 'inline',
                            display: {
                              xs: 'none',
                              sm: 'block',
                              md: 'block',
                              lg: 'block',
                            },
                          }}
                        >
                          {showMore ? 'Hide' : 'View'} Details
                        </Typography>
                        {showMore ? (
                          <ExpandLessIcon
                            sx={{
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                            style={{ color: '#fff' }}
                          />
                        ) : (
                          <ExpandMoreIcon
                            sx={{
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                            style={{ color: '#fff' }}
                          />
                        )}
                      </Grid>
                      {!showMore ? (
                        <></>
                      ) : (
                        <>
                          {restaurantHours &&
                            restaurantHours.length > 0 &&
                            restaurantHours
                              .slice(1)
                              .map((item: any, index: number) => (
                                <Grid
                                  container
                                  spacing={0}
                                  key={index}
                                  sx={{
                                    display: {
                                      xs: 'none',
                                      sm: 'flex',
                                      md: 'flex',
                                      lg: 'flex',
                                    },
                                  }}
                                >
                                  <Grid item xs={3}>
                                    <List
                                      sx={{
                                        padding: '2px 0 0 0',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'background.paper',
                                      }}
                                      role="presentation"
                                    >
                                      <ListItem
                                        sx={{
                                          padding: '0 0 0 0',
                                          fontFamily:
                                            "'Poppins-Medium' !important",
                                        }}
                                        title={
                                          (item.weekday &&
                                            item.weekday.toUpperCase()) ||
                                          ''
                                        }
                                      >
                                        {(item.weekday &&
                                          item.weekday.toUpperCase()) ||
                                          ''}
                                      </ListItem>
                                    </List>
                                  </Grid>
                                  <Grid item xs={9}>
                                    <List
                                      sx={{
                                        padding: '2px 0 0 0',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: 'background.paper',
                                        fontFamily:
                                          "'Poppins-Medium' !important",
                                      }}
                                      role="presentation"
                                    >
                                      <ListItem
                                        sx={{
                                          padding: '0 0 0 0',
                                        }}
                                        title={
                                          item.isOpenAllDay
                                            ? 'Open 24 hours'
                                            : getTimeFormat(item.start) +
                                              ' - ' +
                                              getTimeFormat(item.end)
                                        }
                                      >
                                        {item.isOpenAllDay
                                          ? 'Open 24 hours'
                                          : getTimeFormat(item.start) +
                                            ' - ' +
                                            getTimeFormat(item.end)}
                                      </ListItem>
                                    </List>
                                  </Grid>
                                </Grid>
                              ))}
                          <Typography
                            className={classes.heading}
                            variant="h2"
                            textTransform="uppercase"
                            title="Address"
                            sx={{
                              marginTop: '10px',
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                          >
                            Address
                          </Typography>
                          <Typography
                            variant="body1"
                            color="#fff"
                            component="div"
                            textTransform="uppercase"
                            fontSize={11}
                            paddingTop="8px"
                            title={`${restaurantInfo.streetaddress}, ${restaurantInfo.city}, ${restaurantInfo.state}`}
                            sx={{
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                          >
                            <p style={{ paddingBottom: '2px' }}>
                              {restaurantInfo.streetaddress}
                            </p>
                            <p style={{ paddingBottom: '2px' }}>
                              {restaurantInfo.city}, {restaurantInfo.state}
                            </p>
                            {restaurantInfo.distance > 0 && (
                              <p>
                                {restaurantInfo.distance.toFixed(2)} Miles Away
                              </p>
                            )}
                          </Typography>
                        </>
                      )}
                    </>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default React.memo(StoreInfoBar);
