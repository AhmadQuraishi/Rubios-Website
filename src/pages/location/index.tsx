import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import LocationCard from '../../components/location';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseRestaurant } from '../../types/olo-api';
import {
  getNearByResturantListRequest,
  getResturantListRequest,
} from '../../redux/actions/restaurant/list';
import LoadingBar from '../../components/loading-bar';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displayToast } from '../../helpers/toast';
import './index.css';
import Page from '../../components/page-title';
import { getAddress, removeTestingStores } from '../../helpers/common';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import * as Yup from 'yup';
import { Formik } from 'formik';

const useStyles = makeStyles((theme: Theme) => ({
  dummyBg: {
    position: 'absolute',
    height: '100vh',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    background: 'rgba(0, 0, 0, 0)',
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
  },
}));

const mapContainerStyle = {
  width: '100%',
  height: 'auto',
};

const Location = () => {
  const [libraries] = useState<any>(['places']);
  useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY?.toString() || '',
    libraries,
  });
  const classes = useStyles();
  const { restaurants, nearbyRestaurants, loading } = useSelector(
    (state: any) => state.restaurantListReducer,
  );

  const mapRef = useRef();
  const loadMap = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const [mapCenter, setMapCenter] = useState<any>();
  const [showNearBy, setShowNearBy] = useState(false);
  const [LatLng, setLatLng] = useState<any>();
  const [orderType, setOrderType] = useState<string>();
  const [zoom, setZoom] = useState<number>(7);
  const [nearByRestaurantsFound, setNearByRestaurantsFound] = useState(false);
  const [actionPerform, setActionPerform] = useState(false);
  const dispatch = useDispatch();
  const [deliveryRasturants, setDeliveryRasturants] = useState<any>();
  const [allResturants, setAllResturants] = useState<any>();
  const [filteredRestaurants, setfilteredRestaurants] = useState<any>([]);
  const [deliveryAddressString, setDeliveryAddressString] = useState<any>();
  const [searchText, setSearchText] = useState<string>('');

  const { userDeliveryAddresses } = useSelector(
    (state: any) => state.userReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    if (!orderType) {
      setMapCenter({
        lat: 37.772,
        lng: -122.214,
      });
      dispatch(getResturantListRequest());
    }
  }, []);

  const setOrderTypeMain = (type: any) => {
    setfilteredRestaurants([]);
    setAllResturants([]);
    setDeliveryRasturants([]);
    setActionPerform(false);
    setLatLng(null);
    setShowNearBy(false);
    setNearByRestaurantsFound(false);
    setDeliveryAddressString(null);
    setSearchText('');
    setOrderType(type);
  };

  const setMayLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latLong = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setMapCenter(latLong);
      setMarkers((markers) => [
        ...markers,
        <Marker
          key={Math.random() + 'index'}
          position={latLong}
          icon={
            'https://maps.gstatic.com/mapfiles/maps_lite/images/1x/ic_my_location_24dp_3.png'
          }
        />,
      ]);
      setZoom(16);
    });
  };

  const addCustomAddressCheck = () => {
    if (
      providerToken &&
      authToken &&
      authToken.authtoken &&
      authToken.authtoken !== '' &&
      orderType === 'dispatch' &&
      userDeliveryAddresses &&
      userDeliveryAddresses.deliveryaddresses &&
      userDeliveryAddresses.deliveryaddresses.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getLocationError = (error: any) => {
    let errorMsg = '';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMsg = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMsg = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorMsg = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        errorMsg = 'An unknown error occurred.';
        break;
      default:
        errorMsg = 'An unknown error occurred.';
    }

    return errorMsg;
  };

  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [selectedLatLng, setSelectedLatLng] = useState<any>();
  useEffect(() => {
    if (LatLng && actionPerform) {
      if (LatLng) {
        getNearByRestaurants(LatLng.lat, LatLng.lng);
      }
    } else if (
      showNearBy &&
      orderType &&
      searchText === '' &&
      // orderType === 'dispatch' &&
      !addCustomAddressCheck()
    ) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            getGeocode({
              location: {
                lat: lat,
                lng: lng,
              },
            })
              .then((results) => {
                const address = getAddress(results[0]);
                if (address.address1 !== '') {
                  if (orderType !== 'dispatch') {
                    getNearByRestaurants(lat, lng);
                    setSelectedLatLng({
                      lat: lat,
                      lng: lng,
                    });
                  } else {
                    handleClickOpen();
                    setSelectedAddress(address);
                    setActionPerform(false);
                    setShowNearBy(true);
                    setSelectedLatLng({
                      lat: lat,
                      lng: lng,
                    });
                  }
                  return;
                } else {
                  setActionPerform(false);
                  setShowNearBy(false);
                  displayToast(
                    'ERROR',
                    'No address found against your current location.',
                  );
                }
              })
              .catch((error) => {
                displayToast(
                  'ERROR',
                  'No address found against your current location.',
                );
                setActionPerform(false);
                setShowNearBy(false);
              });

            setZoom(7);
          },
          function (error) {
            displayToast('ERROR', getLocationError(error));
            setShowNearBy(false);
            setActionPerform(false);
            setZoom(7);
          },
        );
      }
    }
  }, [showNearBy, LatLng]);

  useEffect(() => {
    if (orderType === 'dispatch' || showNearBy) {
      return;
    }
    if (restaurants && restaurants.restaurants) {
      if (restaurants.restaurants.length === 0) {
        setfilteredRestaurants([]);
        setDeliveryRasturants([]);
        setAllResturants([]);
      } else {
        if (orderType && orderType !== '') {
          setfilteredRestaurants(
            getFilteredRestaurants(restaurants.restaurants),
          );
        }
        setAllResturants(getFilteredRestaurants(restaurants.restaurants));
        setMapCenter({
          lat: restaurants.restaurants[0].latitude,
          lng: restaurants.restaurants[0].longitude,
        });
        setZoom(7);
      }
    }
  }, [restaurants, orderType]);

  useEffect(() => {
    if (nearbyRestaurants && nearbyRestaurants.restaurants) {
      if (nearbyRestaurants.restaurants.length === 0) {
        if (showNearBy || LatLng) {
          setShowNearBy(false);
          setNearByRestaurantsFound(false);
          if (LatLng) {
            setDeliveryRasturants([]);
            displayToast(
              'ERROR',
              "We could not find any Rubio's within 10 miles of your address.",
            );
          } else {
            setDeliveryRasturants([]);
            displayToast(
              'ERROR',
              "We could not find any Rubio's within 10 miles of your current location.",
            );
          }
          setLatLng(null);
          setZoom(7);
          setActionPerform(false);
        }
        setfilteredRestaurants([]);
        setDeliveryRasturants([]);
      } else {
        if (showNearBy || LatLng) {
          console.log('working 1');
          if (LatLng) {
            setDeliveryRasturants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
            setfilteredRestaurants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
            setActionPerform(false);
          }
          if (showNearBy) {
            setDeliveryRasturants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
            setfilteredRestaurants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
            setShowNearBy(false);
            setNearByRestaurantsFound(true);
          }
          setLatLng(null);
          setShowNearBy(false);
          setActionPerform(false);
          setMapCenter({
            lat: nearbyRestaurants.restaurants[0].latitude,
            lng: nearbyRestaurants.restaurants[0].longitude,
          });
          setZoom(7);
        } else {
          if (orderType && orderType !== '') {
            console.log('working 2');
            setfilteredRestaurants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
          }
        }
      }
    }
  }, [nearbyRestaurants]);

  useEffect(() => {
    setMarkers([]);
    console.log('showNearBy', showNearBy);
    console.log('selectedLatLng', selectedLatLng);
    if (restaurants && restaurants.restaurants.length > 0) {
      let filteredRest = !orderType
        ? restaurants.restaurants
        : orderType && !showNearBy
        ? filteredRestaurants
        : orderType && selectedLatLng
        ? deliveryRasturants
        : [];

      filteredRest = getFilteredRestaurants(filteredRest);

      filteredRest.map((item: ResponseRestaurant, index: number) => {
        if (mapCenter == undefined) {
          setMapCenter({
            lat: item.latitude,
            lng: item.longitude,
          });
        }
        let latLong = {
          lat: item.latitude,
          lng: parseFloat(item.longitude),
        };
        setMarkers((markers) => [
          ...markers,
          <Marker key={Math.random() + index} position={latLong} />,
        ]);
      });
    }
  }, [restaurants, filteredRestaurants, deliveryRasturants, orderType]);

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
    dispatch(getNearByResturantListRequest(lat, long, 10, 6, dateFrom, dateTo));
  };
  const [markers, setMarkers] = useState<any[]>([]);

  const getFilteredRestaurants = (restaurants: any) => {
    let filteredRestaurants = restaurants;
    if (orderType && orderType !== '') {
      if (orderType === 'pickup') {
        filteredRestaurants = restaurants.filter(
          (x: any) => x.canpickup === true,
        );
      } else if (orderType === 'curbside') {
        filteredRestaurants = restaurants.filter(
          (x: any) => x.supportscurbside === true,
        );
      } else if (orderType === 'dispatch') {
        filteredRestaurants = restaurants.filter(
          (x: any) => x.supportsdispatch === true,
        );
      }
    }
    filteredRestaurants = removeTestingStores(filteredRestaurants);
    return filteredRestaurants;
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLatLng(null);
    setShowNearBy(false);
    setActionPerform(false);
    setSearchText('');
    setfilteredRestaurants([]);
    setDeliveryRasturants([]);
    selectedLatLng(null);
  };

  const handleLCloseConfirm = (updatedAddress: any) => {
    setOpen(false);
    getGeocode({
      address:
        updatedAddress.address1 +
        ' ' +
        updatedAddress.address2 +
        ', ' +
        updatedAddress.city +
        ', ' +
        updatedAddress.zip,
    })
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          const address = getAddress(results[0]);
          setDeliveryAddressString(selectedAddress);
          if (address.address1 !== '') {
            //setLatLng({ lat: lat, lng: lng });
            getNearByRestaurants(lat, lng);
          } else {
            getNearByRestaurants(selectedLatLng.lat, selectedLatLng.lng);
          }
        });
      })
      .catch((err: any) => {
        getNearByRestaurants(selectedLatLng.lat, selectedLatLng.lng);
      });
  };

  useEffect(() => {
    console.log('start------------>');
    console.log('orderType', orderType);
    console.log('showNearBy', showNearBy);
    console.log('LatLng', LatLng);
    console.log('actionPerform', actionPerform);
    console.log('selectedAddress', selectedAddress);
    console.log('filteredRestaurants', filteredRestaurants);
    console.log('AllResturants', allResturants);
    console.log('deliveryRasturants', deliveryRasturants);
    console.log('nearbyRestaurants', nearbyRestaurants);
    console.log('end------------>');
  }, [
    filteredRestaurants,
    allResturants,
    deliveryRasturants,
    nearbyRestaurants,
  ]);

  return (
    <Page title={'Location'} className="">
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ width: '100%' }}
        TransitionProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': 'Confirm Your Delivery Address',
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirm Your Delivery Address'}
        </DialogTitle>
        {selectedAddress && (
          <Formik
            initialValues={{
              address1: selectedAddress && selectedAddress.address1,
              address2: selectedAddress && selectedAddress.address2,
              city: selectedAddress && selectedAddress.city,
              zip: selectedAddress && selectedAddress.zip,
              isdefault:
                (selectedAddress && selectedAddress.isdefault) || false,
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
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
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
                      setSelectedAddress({
                        address1: values.address1 || '',
                        address2: values.address2 || '',
                        city: values.city || '',
                        zip: values.zip || '',
                        isdefault: values.isdefault,
                      });
                      handleLCloseConfirm({
                        address1: values.address1 || '',
                        address2: values.address2 || '',
                        city: values.city || '',
                        zip: values.zip || '',
                        isdefault: values.isdefault,
                      });
                    }}
                    sx={{ marginRight: '15px', marginBottom: '15px' }}
                    autoFocus
                    disabled={
                      values.address1 === '' ||
                      values.city === '' ||
                      values.zip === '' ||
                      !isValid
                    }
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        )}
      </Dialog>
      <div style={{ minHeight: '300px', position: 'relative' }}>
        {(loading || window.google === undefined || actionPerform) && (
          <div className={classes.dummyBg}>
            <LoadingBar />
          </div>
        )}
        {window.google && (
          <div role="region" aria-label="map">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={zoom}
              center={mapCenter}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={loadMap}
            >
              {markers}
              <div
                onClick={() => {
                  setMayLocation();
                }}
                className="location-icon-panel"
              >
                <span className="icon"></span>
              </div>
              <LocationCard
                searchTextP={searchText}
                isNearByRestaurantList={nearByRestaurantsFound}
                restaurants={allResturants}
                deliveryRasturants={deliveryRasturants}
                setOrderTypeMain={setOrderTypeMain}
                setShowNearBy={setShowNearBy}
                setLatLng={setLatLng}
                setActionPerform={setActionPerform}
                setDeliveryRasturants={setDeliveryRasturants}
                setfilteredRestaurants={setfilteredRestaurants}
                filteredRestaurants={filteredRestaurants}
                loading={loading}
                deliveryAddressString={deliveryAddressString}
                setDeliveryAddressString={setDeliveryAddressString}
                setSelectedLatLng={setSelectedLatLng}
                addCustomAddressCheck={addCustomAddressCheck}
              />
            </GoogleMap>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Location;
