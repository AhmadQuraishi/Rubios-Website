import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  // GoogleMap,
  Marker,
  // useLoadScript
} from '@react-google-maps/api';
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
import { getAddress } from '../../helpers/common';
import { getOrderTypeRestaurants } from '../../helpers/location';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { staticMapUrl } from 'static-google-map';
import GoogleMapComponent from '../../components/location/google-map';

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

const actionTypes: any = {
  CURRENT_LOCATION: 'CURRENT_LOCATION',
  LOCAL_SEARCH: 'LOCAL_SEARCH',
  GOOGLE_SEARCH: 'GOOGLE_SEARCH',
  ALL: 'ALL',
};
const Location = () => {
  const mapRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [mapCenter, setMapCenter] = useState<any>();
  const [zoom, setZoom] = useState<number>(7);
  const [LatLng, setLatLng] = useState<any>(null);
  const [orderType, setOrderType] = useState<string | null>(null);
  const [action, setAction] = useState(actionTypes.All);
  const [actionPerform, setActionPerform] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [deliveryAddressString, setDeliveryAddressString] = useState<any>();
  const [restaurantNotFound, setRestaurantNotFound] = useState(false);
  const [hideCurrentLocation, setHideCurrentLocation] = useState(false);
  const [staticMapImageUrl, setStaticMapImageUrl] = useState('');
  const [loadDynamicMap, setLoadDynamicMap] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // const [libraries] = useState<any>(['places']);
  // useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY?.toString() || '',
  //   libraries,
  // });
  //
  // const loadMap = useCallback((map: any) => {
  //   mapRef.current = map;
  // }, []);

  const {
    restaurants,
    nearbyRestaurants,
    loading: restaurantLoading,
  } = useSelector((state: any) => state.restaurantListReducer);
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

  const changeOrderType = (orderType: string) => {
    setOrderType(orderType);
    setAction(actionTypes.All);
    setActionPerform(false);
    setLatLng(null);
    setDeliveryAddressString(null);
    setSelectedAddress(null);
    setFilteredRestaurants([]);
    setRestaurantNotFound(false);
    setHideCurrentLocation(false);
    if (
      restaurants?.restaurants?.length > 0 &&
      orderType &&
      orderType !== 'dispatch'
    ) {
      const rest = getOrderTypeRestaurants(restaurants.restaurants, orderType);
      setFilteredRestaurants(rest);
      setMapCenter({
        lat: restaurants.restaurants[0].latitude,
        lng: restaurants.restaurants[0].longitude,
      });
      setZoom(7);
    }
  };

  const populateMarkersOnMap = (restaurants: any) => {
    setMarkers([]);
    // {
    //   color: 'red',
    //     markers: [
    //   {location: { lat: '28.3125', lng: '-97.6257' }},
    // ]
    // }
    let markersStatic: any = [];
    restaurants.forEach((item: ResponseRestaurant, index: number) => {
      // console.log('item name', item.name);
      if (item.id !== 64081) {
        markersStatic.push({
          color: 'red',
          markers: [{ location: { lat: item.latitude, lng: item.longitude } }],
        });
      }

      if (mapCenter === undefined) {
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
    // console.log('markersStatic', markersStatic);
    const url = staticMapUrl({
      key: process.env.REACT_APP_GOOGLE_API_KEY?.toString(),
      scale: 2,
      center: '34.5072833,-117.3999287',
      size: '640x640',
      format: 'png',
      maptype: 'roadmap',
      zoom: 6,
      markerGroups: markersStatic,
    });
    setStaticMapImageUrl(url);
    // console.log(url);
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

  const currentLocation = () => {
    setLatLng(null);
    setActionPerform(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log('working 11', position);
          const lat: any = parseFloat(String(position.coords.latitude)).toFixed(
            0,
          );
          const lng: any = parseFloat(
            String(position.coords.longitude),
          ).toFixed(0);

          getGeocode({
            location: {
              lat: Number(lat),
              lng: Number(lng),
            },
          })
            .then((results) => {
              console.log('working 22', results);
              const address = getAddress(results[0]);
              if (address.address1 !== '') {
                if (orderType !== 'dispatch') {
                  setActionPerform(true);
                  setLatLng({
                    lat: lat,
                    lng: lng,
                  });
                  getNearByRestaurants(lat, lng);
                } else {
                  setLatLng({
                    lat: lat,
                    lng: lng,
                  });
                  handleClickOpen();
                  setSelectedAddress(address);
                  setActionPerform(false);
                }
                return;
              } else {
                console.log('working 33');
                setActionPerform(false);
                displayToast(
                  'ERROR',
                  'No address found against your current location.',
                );
              }
            })
            .catch((error) => {
              console.log('working 44', error);
              displayToast(
                'ERROR',
                'No address found against your current location.',
              );
              setActionPerform(false);
            });

          setZoom(7);
        },
        function (error) {
          console.log('working 55', error);
          displayToast('ERROR', getLocationError(error));
          setActionPerform(false);
          setZoom(7);
        },
      );
    }
  };

  useEffect(() => {
    if (restaurants?.restaurants) {
      if (restaurants.restaurants.length === 0) {
        setFilteredRestaurants([]);
      } else {
        const rest = getOrderTypeRestaurants(restaurants.restaurants, null);
        setFilteredRestaurants(rest);
        populateMarkersOnMap(rest);
        setMapCenter({
          lat: restaurants.restaurants[0].latitude,
          lng: restaurants.restaurants[0].longitude,
        });
        setZoom(7);
      }
    }
  }, [restaurants]);

  useEffect(() => {
    if (nearbyRestaurants?.restaurants) {
      if (nearbyRestaurants?.restaurants?.length === 0) {
        displayToast(
          'ERROR',
          "We could not find any Rubio's within 10 miles of your address.",
        );
        setActionPerform(false);
        setFilteredRestaurants([]);
      } else {
        const rest = getOrderTypeRestaurants(
          nearbyRestaurants.restaurants,
          orderType,
        );
        setFilteredRestaurants(rest);
        populateMarkersOnMap(rest);
        setMapCenter({
          lat: nearbyRestaurants.restaurants[0].latitude,
          lng: nearbyRestaurants.restaurants[0].longitude,
        });
        setZoom(7);
        setActionPerform(false);
        setRestaurantNotFound(false);

        if (action === actionTypes.CURRENT_LOCATION) {
          setHideCurrentLocation(true);
        }
      }
    }
  }, [nearbyRestaurants]);

  useEffect(() => {
    populateMarkersOnMap(filteredRestaurants);
  }, [filteredRestaurants]);

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
  const [markers, setMarkers] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLatLng(null);
    setActionPerform(false);
    setFilteredRestaurants([]);
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
            setLatLng({ lat: lat, lng: lng });
            getNearByRestaurants(lat, lng);
          } else {
            getNearByRestaurants(LatLng.lat, LatLng.lng);
          }
        });
      })
      .catch((err: any) => {
        getNearByRestaurants(LatLng.lat, LatLng.lng);
      });
  };

  useEffect(() => {
    console.log('orderType', orderType);
  }, [orderType]);

  const fitMapView = () => {
    const locationCardView = document.getElementById('location-card-view');
    const googleMapLocation = document.getElementById('google-map-location');
    const pageHeader: any = document.getElementById('page-header');

    if (googleMapLocation) {
      if (locationCardView) {
        googleMapLocation.style.height = locationCardView?.clientHeight + 'px';
      }
      if (pageHeader) {
        googleMapLocation.style.top = pageHeader?.clientHeight + 'px';
      }
    }
  };

  window.addEventListener(
    'orientationchange',
    function () {
      fitMapView();
    },
    false,
  );

  window.addEventListener(
    'resize',
    function () {
      fitMapView();
    },
    false,
  );

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

      <div style={{ minHeight: '300px', zIndex: 1, height: 'auto' }}>
        {(restaurantLoading || actionPerform) && (
          <div className={classes.dummyBg}>
            <LoadingBar />
          </div>
        )}
        <div
          style={{
            backgroundImage: `url(${staticMapImageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
            height: '100%',
            width: 'auto',
            backgroundColor: '#8ab4f8',
          }}
          role="region"
          aria-label="map"
        >
          {/*<img*/}
          {/*  src={staticMapImageUrl}*/}
          {/*  style={{*/}
          {/*    height: '100%',*/}
          {/*    width: 'auto',*/}
          {/*    position: 'absolute',*/}
          {/*    left: '50%',*/}
          {/*    transform: 'translate(-50%, 0)',*/}
          {/*  }}*/}
          {/*/>*/}

          {/*<div></div>*/}

          {orderType && loadDynamicMap && (
            <div>
              <GoogleMapComponent
                zoom={zoom}
                mapCenter={mapCenter}
                markers={markers}
                actionTypes={actionTypes}
                setAction={setAction}
                orderType={orderType}
                changeOrderType={changeOrderType}
                setLatLng={setLatLng}
                setActionPerform={setActionPerform}
                deliveryAddressString={deliveryAddressString}
                setDeliveryAddressString={setDeliveryAddressString}
                allRestaurants={restaurants?.restaurants || []}
                setFilteredRestaurants={setFilteredRestaurants}
                filteredRestaurants={filteredRestaurants}
                loading={restaurantLoading}
                addCustomAddressCheck={addCustomAddressCheck}
                currentLocation={currentLocation}
                setRestaurantNotFound={setRestaurantNotFound}
                restaurantNotFound={restaurantNotFound}
                hideCurrentLocation={hideCurrentLocation}
                getNearByRestaurants={getNearByRestaurants}
                fitMapView={fitMapView}
                isMapLoaded={isMapLoaded}
                setIsMapLoaded={setIsMapLoaded}
              />
            </div>
          )}

          {/*{!orderType && (*/}
          <LocationCard
            actionTypes={actionTypes}
            setAction={setAction}
            orderType={orderType}
            changeOrderType={changeOrderType}
            setLatLng={setLatLng}
            setActionPerform={setActionPerform}
            deliveryAddressString={deliveryAddressString}
            setDeliveryAddressString={setDeliveryAddressString}
            allRestaurants={restaurants?.restaurants || []}
            setFilteredRestaurants={setFilteredRestaurants}
            filteredRestaurants={filteredRestaurants}
            loading={restaurantLoading}
            addCustomAddressCheck={addCustomAddressCheck}
            currentLocation={currentLocation}
            setRestaurantNotFound={setRestaurantNotFound}
            restaurantNotFound={restaurantNotFound}
            hideCurrentLocation={hideCurrentLocation}
            getNearByRestaurants={getNearByRestaurants}
            loadDynamicMap={loadDynamicMap}
            setLoadDynamicMap={setLoadDynamicMap}
            isMapLoaded={isMapLoaded}
          />
          {/*)}*/}
        </div>
        {/*)}*/}
      </div>
    </Page>
  );
};

export default Location;
