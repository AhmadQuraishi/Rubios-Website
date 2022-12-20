import {
  Grid,
  Typography,
  Button,
  DialogContentText,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantInfoOrderType } from '../../redux/actions/restaurant';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LocationChangeModal } from '../location-change-modal';
import {
  setBasketDeliveryAddress,
  setBasketDeliveryMode,
} from '../../services/basket';
import { setBasketDeliveryAddressSuccess } from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import './order-type.css';
import { isLoginUser } from '../../helpers/auth';
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
//   Init,
// } from 'use-places-autocomplete';
import Geocode from 'react-geocode';
import { getAddress } from '../../helpers/common';
import {
  getNearByResturantListRequest,
  // getResturantListRequest,
} from '../../redux/actions/restaurant/list';
import { useNavigate } from 'react-router-dom';
import {
  // getBasketRequestSuccess,
  resetBasketRequest,
} from '../../redux/actions/basket';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
// import { setDeliveryAddress } from '../../redux/actions/location/delivery-address';
import {
  basketTransferRequest,
  // basketTransferReset,
} from '../../redux/actions/basket/transfer';
import { setDeliveryAddress } from '../../redux/actions/location/delivery-address';

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_API_KEY}`);
Geocode.setLanguage('en');
Geocode.setRegion('us');
Geocode.setLocationType('ROOFTOP');

export const OrderTypeDialog = (props: any) => {
  const {
    type,
    openModal,
    setOpenModal,
    // changeOrderType,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { orderType, restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  // const [alignment, setAlignment] = React.useState('web');
  const [actionPerform, setActionPerform] = useState(false);
  const basketObj = useSelector((state: any) => state.basketReducer);
  // const [LatLng, setLatLng] = useState<any>(null);
  const [showLocationChangeModal, setShowLocationChangeModal] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState<any>();
  // const [deliveryAddressString, setDeliveryAddressString] = useState<any>();
  const [newDeliveryAddress, setNewDeliveryAddress] = useState<any>(null);
  // const [filteredRestaurants, setFilteredRestaurants] = useState<any>([]);
  const [changeOrderType, setChangeOrderType] = useState<any>(
    basketObj?.basket?.deliverymode || orderType || 'pickup',
  );

  const [newRestaurant, setNewRestaurant] = useState<any>(null);
  const { restaurant: selectedRestaurant, orderType: selectedOrderType } =
    useSelector((state: any) => state.restaurantInfoReducer);

  const {
    restaurants,
    nearbyRestaurants,
    loading: restaurantLoading,
  } = useSelector((state: any) => state.restaurantListReducer);
  const {
    data: newBasket,
    loading: newBasketLoading,
    error: newBasketError,
  } = useSelector((state: any) => state.basketTransferReducer);
  const onServiceSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment) {
      setChangeOrderType(newAlignment);
    }
  };
  useEffect(() => {
    if (!actionPerform) {
      return;
    }
    nearbyRestaurantAction();
  }, [nearbyRestaurants]);
  useEffect(() => {
    if (!newBasketLoading && actionPerform) {
      if (newBasketError) {
        displayToast(
          'ERROR',
          newBasketError?.response?.data?.message ||
            'ERROR! Please Try again later',
        );
        displayToast('SUCCESS', 'Location changed to ' + newRestaurant.name);
        dispatch(resetBasketRequest());
        dispatch(setResturantInfoRequest(newRestaurant, orderType || ''));
        dispatch(setDeliveryAddress(newDeliveryAddress.address));
        setButtonDisabled(false);
        setActionPerform(false);
        navigate('/');
      } else if (newBasket?.basket) {
        setShowLocationChangeModal(true);
        setActionPerform(true);
      }
    }
  }, [newBasket, newBasketLoading, newBasketError]);

  const handleClose = () => {
    setOpenModal(false);
    setButtonDisabled(false);
  };
  const checkButtonDisable = (values: any, isValid: any) => {
    console.log('orderType 1', orderType);
    console.log('isValid', isValid);
    console.log('buttonDisabled', buttonDisabled);
    console.log('values', values);
    return (
      buttonDisabled ||
      (changeOrderType === 'dispatch' &&
        (values.address1 === '' ||
          values.city === '' ||
          values.zip === '' ||
          !isValid))
    );
  };
  const restaurantSupportedHanOffMode = (mode: string) => {
    if (restaurant && mode) {
      switch (mode) {
        case 'pickup':
          return restaurant?.canpickup;
        case 'curbside':
          return restaurant?.supportscurbside;
        case 'dinein':
          return restaurant?.supportsdinein;
        case 'dispatch':
          return restaurant?.supportsdispatch;
        default:
          return false;
      }
    }
  };
  const backdropClose = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    handleClose();
  };
  const handleOrderUpdate = async (formData: any) => {
    setButtonDisabled(true);
    setActionPerform(true);
    setNewDeliveryAddress(formData);
    if (changeOrderType !== 'dispatch') {
      try {
        const body = {
          deliverymode: changeOrderType,
        };
        const response = await setBasketDeliveryMode(
          basketObj?.basket?.id,
          body,
        );
        basketSuccess(response);
      } catch (error: any) {
        basketError(error);
      }
    } else if (formData.address) {
      const address =
        formData?.address?.address1 +
        ' ' +
        formData?.address?.address2 +
        ', ' +
        formData?.address?.city +
        ', ' +
        formData?.address?.zip;

      Geocode.fromAddress(address).then(
        (response: any) => {
          const { lat, lng } = response?.results[0]?.geometry?.location;
          const address = getAddress(response.results[0]);
          setActionPerform(true);
          if (address.address1 !== '') {
            getNearByRestaurants(lat, lng);
          } else {
            setButtonDisabled(false);
            displayToast('ERROR', 'Please enter valid delivery address.');
          }
        },
        (error: any) => {
          setActionPerform(false);
          setButtonDisabled(false);
          displayToast('ERROR', 'Please enter valid delivery address.');
        },
      );
    }
  };
  const getNearByRestaurants = (lat: number, long: number) => {
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
    dispatch(getNearByResturantListRequest(lat, long, 40, 6, dateFrom, dateTo));
  };
  const nearbyRestaurantAction = async () => {
    if (nearbyRestaurants?.restaurants?.length === 0) {
      displayToast(
        'ERROR',
        "We could not find any Rubio's within 10 miles of your address.",
      );
      setButtonDisabled(false);
      setActionPerform(false);
      // handleClose();
    } else if (nearbyRestaurants?.restaurants?.length > 0) {
      if (basketObj?.basket) {
        if (
          nearbyRestaurants?.restaurants[0]?.id === basketObj?.basket?.vendorid
        ) {
          try {
            let updatedAddress: any = {
              building: newDeliveryAddress?.address?.address2 || '',
              streetaddress: newDeliveryAddress?.address?.address1 || '',
              city: newDeliveryAddress?.address?.city || '',
              zipcode: newDeliveryAddress?.address?.zip || '',
              isdefault: newDeliveryAddress?.address?.isdefault || false,
            };
            const response = await setBasketDeliveryAddress(
              basketObj?.basket?.id,
              updatedAddress,
            );
            dispatch(setBasketDeliveryAddressSuccess(response));
            dispatch(
              setResturantInfoRequest(
                nearbyRestaurants?.restaurants[0],
                changeOrderType || '',
              ),
            );
            setShowLocationChangeModal(false);
            handleClose();
            setActionPerform(false);
            displayToast('SUCCESS', 'Order updated!');
            if (type === 'RECENT_ORDER') {
              navigate('/checkout');
            } else if ('WELCOME') {
              navigate('/checkout');
            } else {
            }
            // basketSuccess(response);
          } catch (error: any) {
            displayToast(
              'ERROR',
              error?.response?.data?.message
                ? error.response.data.message
                : 'ERROR! Please Try again later',
            );
            setButtonDisabled(false);
            setActionPerform(false);
            // basketError(error);
          }
        } else {
          dispatch(
            basketTransferRequest(
              basketObj?.basket?.id,
              nearbyRestaurants?.restaurants[0]?.id,
            ),
          );
          setNewRestaurant(nearbyRestaurants?.restaurants[0]);
        }
      } else {
        dispatch(
          setResturantInfoRequest(
            nearbyRestaurants?.restaurants[0],
            changeOrderType || '',
          ),
        );
        setButtonDisabled(false);
        setActionPerform(false);
        handleClose();
        navigate('/');
      }
    }
  };
  const basketSuccess = (response: any) => {
    dispatch(setBasketDeliveryAddressSuccess(response));
    // dispatch(setRestaurantInfoOrderType(selectedRestaurant, changeOrderType));
    dispatch(
      setResturantInfoRequest(selectedRestaurant, changeOrderType || ''),
    );
    setButtonDisabled(false);
    setShowLocationChangeModal(false);
    setActionPerform(false);
    handleClose();
    displayToast('SUCCESS', 'Order updated!');
    if (type === 'RECENT_ORDER') {
      navigate('/checkout');
    } else if ('WELCOME') {
      navigate('/checkout');
    } else {
    }
  };
  const basketError = (error: any) => {
    // resetBasketRequest();
    // dispatch();

    displayToast(
      'ERROR',
      error?.response?.data?.message
        ? error.response.data.message
        : 'ERROR! Please Try again later',
    );
    setButtonDisabled(false);
    setActionPerform(false);
    // handleClose();
  };
  const handleChangeLocation = async () => {
    console.log('working 1');
    if (newBasket?.basket && newRestaurant) {
      console.log('working 2');
      if (newDeliveryAddress && changeOrderType === 'dispatch') {
        console.log('working 3');
        let updatedAddress: any = {
          building: newDeliveryAddress?.address?.address2 || '',
          streetaddress: newDeliveryAddress?.address?.address1 || '',
          city: newDeliveryAddress?.address?.city || '',
          zipcode: newDeliveryAddress?.address?.zip || '',
          isdefault: newDeliveryAddress?.address?.isdefault || false,
        };
        try {
          console.log('working 4');
          //setActionPerform(true);
          const response: any = await setBasketDeliveryAddress(
            newBasket?.basket?.id,
            updatedAddress,
          );

          //setActionPerform(false);
          dispatch(setBasketDeliveryAddressSuccess(response));
          dispatch(
            setResturantInfoRequest(newRestaurant, changeOrderType || ''),
          );
          // setShowLocationChangeModal(false);
          setActionPerform(false);
          handleClose();
          // debugger;
          // navigate('/');
          displayToast('SUCCESS', 'Location changed to ' + newRestaurant.name);
          if (type === 'RECENT_ORDER') {
            navigate('/checkout');
          } else if ('WELCOME') {
            navigate('/checkout');
          } else {
          }
          // debugger;
        } catch (error: any) {
          console.log('working 5');
          //setActionPerform(false);
          displayToast(
            'ERROR',
            error?.response?.data?.message
              ? error.response.data.message
              : 'ERROR! Please Try again later',
          );
          setShowLocationChangeModal(false);
          setActionPerform(false);
          handleClose();
          // debugger;
        }
      }
    }
    console.log('working 6');
  };
  const handleCancelChangeLocation = () => {
    // navigate('/checkout');
    setShowLocationChangeModal(false);
    setButtonDisabled(false);
    setActionPerform(false);
    setOpenModal(false);
    if (type === 'RECENT_ORDER') {
      navigate('/checkout');
    } else if ('WELCOME') {
      navigate('/checkout');
    } else {
    }
  };

  return (
    <>
      {newBasket?.basket && showLocationChangeModal && (
        <LocationChangeModal
          showLocationChangeModal={showLocationChangeModal}
          setShowLocationChangeModal={setShowLocationChangeModal}
          itemsNotAvailable={newBasket?.itemsnottransferred || []}
          restaurant={newRestaurant}
          handleChangeLocation={handleChangeLocation}
          handleCancelChangeLocation={handleCancelChangeLocation}
        />
      )}
      <Dialog
        open={openModal}
        onClose={backdropClose}
        aria-labelledby="modal-dialog-delivery-address"
        aria-describedby="modal-dialog-delivery-address-form"
        sx={{ width: '100%' }}
        TransitionProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': `Change Order Type`,
        }}
        fullWidth
      >
        <DialogTitle id="modal-dialog-delivery-title">{`Confirm Order Type`}</DialogTitle>
        <Formik
          initialValues={{
            orderType: basketObj?.basket?.deliverymode || orderType || 'pickup',
            address1: basketObj?.basket?.deliveryaddress?.streetaddress || '',
            address2: basketObj?.basket?.deliveryaddress?.building || '',
            city: basketObj?.basket?.deliveryaddress?.city || '',
            zip: basketObj?.basket?.deliveryaddress?.zipcode || '',
            isdefault: basketObj?.basket?.deliveryaddress?.isdefault || false,
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
              .matches(/^[0-9\s]+$/, 'Only numbers are allowed for this field ')
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
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid
                    container
                    sx={{
                      width: '100%',
                      justifyContent: 'center',
                      maxHeight: '180px',
                    }}
                  >
                    {/*<Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Order Type
                     // </InputLabel>
                      // <Select
                      //   labelId="demo-simple-select-label"
                      //   id="demo-simple-select"
                      //   value={values.orderType}
                      //   label="Order Type"
                      //   name={'orderType'}
                      //   onChange={handleChange}
                      //   style={{ textAlign: 'left' }}
                      // >
                      //   <MenuItem value={'pickup'}>Pickup</MenuItem>
                      //   <MenuItem value={'curbside'}>Curbside</MenuItem>
                      //   <MenuItem value={'dinein'}>Dine In</MenuItem>
                      //   <MenuItem value={'dispatch'}>Delivery</MenuItem>
                      // </Select>
                    </FormControl>
                  </Grid>*/}
                    <Grid item className="order-tickmark">
                      {/* <Typography variant="h1" className="sr-only">
                Choose your location
              </Typography> */}
                      <ToggleButtonGroup
                        style={{ display: 'inline' }}
                        exclusive
                        value={changeOrderType}
                        onChange={onServiceSelect}
                      >
                        {restaurantSupportedHanOffMode('pickup') && (
                          <ToggleButton
                            role="radio"
                            value={'pickup'}
                            // onClick={() => {
                            //   //setSearchText('');
                            //   changeOrderType('pickup');
                            // }}
                            className="selected-toggle-btn"
                            aria-current={changeOrderType === 'pickup'}
                            aria-label="PickUp, Activating this element will cause results to load below "
                          >
                            PickUp
                          </ToggleButton>
                        )}
                        {restaurantSupportedHanOffMode('curbside') && (
                          <ToggleButton
                            role="radio"
                            value={'curbside'}
                            // onClick={() => {
                            //   //setSearchText('');
                            //   changeOrderType('curbside');
                            // }}
                            className="selected-toggle-btn"
                            aria-current={changeOrderType === 'curbside'}
                            aria-label=" Curbside, Activating this element will cause results to load below "
                          >
                            Curbside
                          </ToggleButton>
                        )}
                        {restaurantSupportedHanOffMode('dinein') && (
                          <ToggleButton
                            role="radio"
                            value={'dinein'}
                            // onClick={() => {
                            //   //setSearchText('');
                            //   changeOrderType('dinein');
                            // }}
                            className="selected-toggle-btn"
                            aria-current={changeOrderType === 'dinein'}
                            aria-label=" Curbside, Activating this element will cause results to load below "
                          >
                            Dine In
                          </ToggleButton>
                        )}
                        {restaurantSupportedHanOffMode('dispatch') && (
                          <ToggleButton
                            value={'dispatch'}
                            role="radio"
                            // onClick={() => {
                            //   // setSearchText('');
                            //   // setShowAllRestaurants(false);
                            //   changeOrderType('dispatch');
                            // }}
                            sx={{
                              fontFamily:
                                "'Poppins-Bold', sans-serif !important",
                              fontSize: '15px',
                              height: '50px',
                              boxShadow:
                                '0px 0px 0px rgba(0, 0, 0, 0.2) !important',
                              textTransform: 'uppercase',
                              borderRadius: '0 !important',
                              letterSpacing: '2.25px !important',
                            }}
                            className="selected-toggle-btn"
                            aria-current={changeOrderType === 'dispatch'}
                            aria-label=" Delivery, Enter your address below to get nearby restaurants"
                          >
                            Delivery
                          </ToggleButton>
                        )}
                      </ToggleButtonGroup>
                    </Grid>
                    {changeOrderType === 'dispatch' && (
                      <>
                        <Grid item xs={12}>
                          <Typography
                            style={{
                              padding: '10px 0px',
                              color: '#000000',
                            }}
                            textAlign={'center'}
                            variant={'body1'}
                          >
                            {`Add Delivery Address`}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            aria-label="Address"
                            label="Street Address"
                            title="Street Address"
                            type="text"
                            autoFocus
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
                            name="second_address"
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
                            name="City"
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
                            name="postal_code"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.zip}
                            onChange={handleChange('zip')}
                            onBlur={handleBlur('zip')}
                            error={Boolean(touched.zip && errors.zip)}
                            helperText={touched.zip && errors.zip}
                          />
                        </Grid>
                        {isLoginUser() && (
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
                        )}
                      </>
                    )}
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOrderUpdate({
                      address: {
                        address1: values.address1 || '',
                        address2: values.address2 || '',
                        city: values.city || '',
                        zip: values.zip || '',
                        isdefault: values.isdefault,
                      },
                    });

                    // orderType: values.orderType,
                  }}
                  sx={{ marginRight: '15px', marginBottom: '15px' }}
                  autoFocus
                  disabled={checkButtonDisable(values, isValid)}
                >
                  Confirm
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
