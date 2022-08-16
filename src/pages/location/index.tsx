import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
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
  Modal,
  TextField,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displayToast } from '../../helpers/toast';
import './index.css';
import Page from '../../components/page-title';
import { getAddress, removeTestingStores } from '../../helpers/common';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY?.toString() || '',
    libraries: ['places'],
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
    if (type !== 'dispatch') {
      dispatch(getResturantListRequest());
    }

    setOrderType(type);
  };

  let newMarker: any;
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

  useEffect(() => {
    if (LatLng && actionPerform) {
      if (LatLng) {
        getNearByRestaurants(LatLng.lat, LatLng.lng);
      }
    } else if (showNearBy && orderType && orderType === 'dispatch') {
      if (navigator.geolocation) {
        console.log('geolocation', navigator.geolocation);
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log('position', position);

            //const lat = 33.1358598;
            //const lng = -117.2815619;
             const lat = position.coords.latitude;
             const lng = position.coords.longitude;

            // getNearByRestaurants(lat, lng);
            getGeocode({
              location: {
                lat: lat,
                lng: lng,
              },
            })
              .then((results) => {
                console.log('results', results);
                const address = getAddress(results[0]);
                console.log('address', address);
                debugger;
                if (address.address1 !== '') {
                  handleClickOpen();
                  setSelectedAddress(address);
                  setActionPerform(false);
                  return;
                  // setLatLng({
                  //   lat: lat,
                  //   lng: lng,
                  // });
                  //setDeliveryAddressString(address);
                } else {
                  setActionPerform(false);
                  displayToast(
                    'ERROR',
                    'No address found against your current location.',
                  );
                }
              })
              .catch((error) => {
                console.log('Error: ', error);
                displayToast(
                  'ERROR',
                  'No address found against your current location.',
                );
                setActionPerform(false);
              });
            setShowNearBy(true);
            setZoom(7);
          },
          function (error) {
            displayToast('ERROR', getLocationError(error));
            setShowNearBy(false);
            setActionPerform(false);
            setZoom(7);
          },
        );
      } else {
        // setShowNearBy(false);
        // setActionPerform(false);
        // setZoom(7);
        // displayToast('ERROR', 'Please turn on location');
      }
    }
  }, [showNearBy, LatLng]);

  useEffect(() => {
    console.log('rest working 1', restaurants);
    if (restaurants && restaurants.restaurants) {
      if (restaurants.restaurants.length === 0) {
        // if (showNearBy || LatLng) {
        //   setShowNearBy(false);
        //   setNearByRestaurantsFound(false);
        //   if (LatLng) {
        //     setDeliveryRasturants([]);
        //     displayToast(
        //       'ERROR',
        //       "We could not find any Rubio's within 10 miles of your address.",
        //     );
        //   } else {
        //     displayToast(
        //       'ERROR',
        //       "We could not find any Rubio's within 10 miles of your current location.",
        //     );
        //   }
        //   setLatLng(null);
        //   dispatch(getResturantListRequest());
        //   setZoom(7);
        //   setActionPerform(false);
        // }
        console.log('nearby');
        setfilteredRestaurants([]);
        setDeliveryRasturants([]);
        setAllResturants([]);
      } else {
        console.log('rest working 2');
        // if (showNearBy || LatLng) {
        //   if (LatLng) {
        //     // const filterRest = getFilteredRestaurants(restaurants.restaurants);
        //     // if (!filterRest.length) {
        //     //   displayToast(
        //     //     'ERROR',
        //     //     "We could not find any Rubio's within 10 miles of your address.",
        //     //   );
        //     // }
        //     // setDeliveryRasturants(restaurants.restaurants);
        //     setDeliveryRasturants(restaurants.restaurants);
        //     setActionPerform(false);
        //   }
        //   setLatLng(null);
        //   if (showNearBy) {
        //     console.log('ppppppp');
        //     // if (orderType === 'dispatch') {
        //     //   setDeliveryRasturants(restaurants.restaurants);
        //     // } else {
        //     //   console.log('ppppppp 2', restaurants.restaurants);
        //     setDeliveryRasturants(restaurants.restaurants);
        //     // }
        //
        //     setShowNearBy(false);
        //     setNearByRestaurantsFound(true);
        //   }
        // } else {
        console.log('restaurants.restaurants', restaurants.restaurants);
        if (orderType && orderType !== '') {
          setfilteredRestaurants(
            getFilteredRestaurants(restaurants.restaurants),
          );
        }
        setAllResturants(getFilteredRestaurants(restaurants.restaurants));
        // }
        setMapCenter({
          lat: restaurants.restaurants[0].latitude,
          lng: restaurants.restaurants[0].longitude,
        });
        setZoom(7);
      }
    }
  }, [restaurants]);

  useEffect(() => {
    console.log('nearbyRestaurants', nearbyRestaurants);
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
          // dispatch(getResturantListRequest());
          setZoom(7);
          setActionPerform(false);
        }
        console.log('nearby');
        console.log('showNearBy', showNearBy);
        console.log('LatLng', LatLng);
        setfilteredRestaurants([]);
        setDeliveryRasturants([]);
        // setAllResturants([])
      } else {
        console.log('rest working 2');
        if (showNearBy || LatLng) {
          if (LatLng) {
            // const filterRest = getFilteredRestaurants(restaurants.restaurants);
            // if (!filterRest.length) {
            //   displayToast(
            //     'ERROR',
            //     "We could not find any Rubio's within 10 miles of your address.",
            //   );
            // }
            // setDeliveryRasturants(restaurants.restaurants);
            setDeliveryRasturants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
            setActionPerform(false);
          }
          setLatLng(null);
          if (showNearBy) {
            console.log('ppppppp');
            // if (orderType === 'dispatch') {
            //   setDeliveryRasturants(restaurants.restaurants);
            // } else {
            //   console.log('ppppppp 2', restaurants.restaurants);
            setDeliveryRasturants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
            // }

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
            setfilteredRestaurants(
              getFilteredRestaurants(nearbyRestaurants.restaurants),
            );
          }
          // setAllResturants(restaurants.restaurants);
        }
        // setMapCenter({
        //   lat: restaurants.restaurants[0].latitude,
        //   lng: restaurants.restaurants[0].longitude,
        // });
        // setZoom(7);
      }
    }
  }, [nearbyRestaurants]);

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
  useEffect(() => {
    setMarkers([]);
    if (restaurants && restaurants.restaurants.length > 0) {
      let filteredRest = !orderType
        ? restaurants.restaurants
        : orderType && orderType !== 'dispatch'
        ? filteredRestaurants
        : orderType && orderType === 'dispatch'
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
          <Marker
            key={Math.random() + index}
            position={latLong}
            // icon={{
            //   url: '/marker.png',
            //   scaledSize: new google.maps.Size(40, 40),
            // }}
          />,
        ]);
      });
    }
  }, [restaurants, filteredRestaurants, deliveryRasturants, orderType]);
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
  };

  const handleLCloseConfirm = () => {
    setOpen(false);
    getGeocode({
      address:
        selectedAddress.address1 +
        ' ' +
        selectedAddress.address2 +
        ', ' +
        selectedAddress.city +
        ', ' +
        selectedAddress.zip,
    }).then((results) => {
      getLatLng(results[0]).then(({ lat, lng }) => {
        const address = getAddress(results[0]);
        setDeliveryAddressString(selectedAddress);
        if (address.address1 !== '') {
          //setLatLng({ lat: lat, lng: lng });
          getNearByRestaurants(lat, lng);
        } else {
          getNearByRestaurants(LatLng.lat, LatLng.lng);
        }
      });
    });
  };
  const handleChange = (key: any, value: any) => {
    if (key == 'address1') {
      setSelectedAddress({ ...selectedAddress, address1: value });
    }
    if (key == 'address2') {
      setSelectedAddress({ ...selectedAddress, address2: value });
    }
    if (key == 'city') {
      setSelectedAddress({ ...selectedAddress, city: value });
    }
    if (key == 'zip') {
      setSelectedAddress({ ...selectedAddress, zip: value });
    }
  };
  return (
    <Page title={'Location'} className="">
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ width: '100%' }}
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirm Your Delivery Address'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container sx={{ width: '100%', maxWidth: '450px' }}>
              <Grid item xs={12}>
                <TextField
                  aria-label="Address"
                  label="Street Address"
                  title="Street Address"
                  type="text"
                  name="street_address"
                  autoComplete="off"
                  sx={{ width: '100%' }}
                  value={selectedAddress && selectedAddress.address1}
                  onChange={(e) => {
                    handleChange('address1', e.target.value);
                  }}
                  // onChange={handleChange('last_name')}
                  // onBlur={handleBlur('last_name')}
                  // error={Boolean(touched.last_name && errors.last_name)}
                  // helperText={touched.last_name && errors.last_name}
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                <TextField
                  aria-label="Apt, Floor, Suite, Building, Company Address"
                  label="Apt, Floor, Suite, Building, Company Address"
                  title="Apt, Floor, Suite, Building, Company Address"
                  type="text"
                  name="second_address"
                  autoComplete="off"
                  sx={{ width: '100%' }}
                  value={selectedAddress && selectedAddress.address2}
                  onChange={(e) => {
                    handleChange('address2', e.target.value);
                  }}
                  // onChange={handleChange('last_name')}
                  // onBlur={handleBlur('last_name')}
                  // error={Boolean(touched.last_name && errors.last_name)}
                  // helperText={touched.last_name && errors.last_name}
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
                  value={selectedAddress && selectedAddress.city}
                  onChange={(e) => {
                    handleChange('city', e.target.value);
                  }}
                  // onBlur={handleBlur('last_name')}
                  // error={Boolean(touched.last_name && errors.last_name)}
                  // helperText={touched.last_name && errors.last_name}
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
                  value={selectedAddress && selectedAddress.zip}
                  onChange={(e) => {
                    handleChange(
                      'zip',
                      e.target.value.trim().length > 5
                        ? e.target.value.trim().substring(0, 5)
                        : e.target.value.trim(),
                    );
                  }}
                  // onBlur={handleBlur('last_name')}
                  // error={Boolean(touched.last_name && errors.last_name)}
                  // helperText={touched.last_name && errors.last_name}
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
            onClick={handleLCloseConfirm}
            sx={{ marginRight: '15px', marginBottom: '15px' }}
            autoFocus
            disabled={
              selectedAddress &&
              (selectedAddress.address1 == '' ||
                selectedAddress.city == '' ||
                selectedAddress.zip == '')
            }
          >
            Confirm
          </Button>
        </DialogActions>
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
              />
            </GoogleMap>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Location;
