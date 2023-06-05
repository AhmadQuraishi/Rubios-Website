import React, { useEffect, useState, useRef } from 'react';
import { Marker } from '@react-google-maps/api';
import LocationCard from '../../components/location';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseRestaurant } from '../../types/olo-api';
import {
  getNearByResturantListRequest,
  getResturantListRequest,
} from '../../redux/actions/restaurant/list';
import LoadingBar from '../../components/loading-bar';
import { Grid, Theme, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displayToast } from '../../helpers/toast';
import './index.css';
import Page from '../../components/page-title';
import { getAddress } from '../../helpers/common';
import { getOrderTypeRestaurants } from '../../helpers/location';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { staticMapUrl } from 'static-google-map';
import GoogleMapComponent from '../../components/location/google-map';
import { isLoginUser } from '../../helpers/auth';
import PromotionDesktop from '../../assets/imgs/PromotionDesktop.png';
import PromotionMobile from '../../assets/imgs/PromotionMobile.png';
import DeliveryAddressConfirmDialog from '../../components/dialogs/delivery-address-confirm';
import { googleMapDigitalSignature } from '../../services/google';

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

const actionTypes: any = {
  CURRENT_LOCATION: 'CURRENT_LOCATION',
  LOCAL_SEARCH: 'LOCAL_SEARCH',
  GOOGLE_SEARCH: 'GOOGLE_SEARCH',
  ALL: 'ALL',
};
const Location = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const markerRef: any = useRef([]);
  const theme = useTheme();

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
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const {
    restaurants,
    nearbyRestaurants,
    loading: restaurantLoading,
  } = useSelector((state: any) => state.restaurantListReducer);
  const { userDeliveryAddresses } = useSelector(
    (state: any) => state.userReducer,
  );

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
      // setMapCenter({
      //   lat: restaurants.restaurants[0].latitude,
      //   lng: restaurants.restaurants[0].longitude,
      // });
      setZoom(7);
    }
    // debugger;
  };

  const generateStaticMap = async (markersStatic: any) => {
    if (restaurantLoading) {
      return;
    }

    const url = staticMapUrl({
      key: process.env.REACT_APP_GOOGLE_API_KEY?.toString(),
      scale: 2,
      center: '34.5072833,-117.3999287',
      size: '640x640',
      format: 'png',
      maptype: 'roadmap',
      zoom: 5,
      markerGroups: markersStatic,
    });

    const response = await googleMapDigitalSignature(url);
    if (response?.path) {
      setStaticMapImageUrl(response.path);
    } else {
      setStaticMapImageUrl(url);
    }
  };

  const populateMarkersOnMap = (restaurants: any) => {
    setMarkers([]);
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
        // setMapCenter({
        //   lat: item.latitude,
        //   lng: item.longitude,
        // });
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
          onLoad={(ref) => (markerRef.current[index] = ref)}
        />,
      ]);
    });
    if (!loadDynamicMap) {
      generateStaticMap(markersStatic);
    }
  };

  // const setMayLocation = () => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     const latLong = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };
  //     setMapCenter(latLong);
  //     setMarkers((markers) => [
  //       ...markers,
  //       <Marker
  //         key={Math.random() + 'index'}
  //         position={latLong}
  //         icon={
  //           'https://maps.gstatic.com/mapfiles/maps_lite/images/1x/ic_my_location_24dp_3.png'
  //         }
  //       />,
  //     ]);
  //     setZoom(16);
  //   });
  // };

  const addCustomAddressCheck = () => {
    if (
      isLoginUser() &&
      orderType === 'dispatch' &&
      userDeliveryAddresses?.deliveryaddresses?.length > 0
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
          const lat: any = parseFloat(String(position.coords.latitude));
          const lng: any = parseFloat(String(position.coords.longitude));

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
        // populateMarkersOnMap(rest);
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
        // populateMarkersOnMap(rest);
        // setMapCenter({
        //   lat: nearbyRestaurants.restaurants[0].latitude,
        //   lng: nearbyRestaurants.restaurants[0].longitude,
        // });
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
  useEffect(() => {
    fitMapView();
  }, [fitMapView]);
  return (
    <>
      {isDesktop && (
        <Page
          title={'Location'}
          description={
            'Skip the line & order ahead for quick & easy pick-up or delivery.'
          }
          className=""
        >
          <DeliveryAddressConfirmDialog
            open={open}
            selectedAddress={selectedAddress}
            handleClose={handleClose}
            setSelectedAddress={setSelectedAddress}
            handleLCloseConfirm={handleLCloseConfirm}
          />
          {/* {(restaurantLoading || actionPerform) && (
        <Grid className={classes.dummyBg}>
          <LoadingBar />
        </Grid>
      )} */}

          <Grid lg={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid lg={5}>
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
            </Grid>
            {orderType && !loadDynamicMap && (
              <Grid lg={7} md={7} sm={7} style={{ width: '100%' }}>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  alt=""
                  src={process.env.REACT_APP_IMAGE_LOCATION_PAGE}
                />
              </Grid>
            )}
            {orderType && loadDynamicMap && (
              <Grid lg={7} style={{ display: 'flex', width: '100%' }}>
                <GoogleMapComponent
                  zoom={zoom}
                  mapCenter={mapCenter}
                  markers={markers}
                  fitMapView={fitMapView}
                  setActionPerform={setActionPerform}
                  setIsMapLoaded={setIsMapLoaded}
                  action={action}
                  actionTypes={actionTypes}
                  currentLocation={currentLocation}
                  markerRef={markerRef}
                  filteredRestaurants={filteredRestaurants}
                />
              </Grid>
            )}
          </Grid>
        </Page>
      )}
      {!isDesktop && (
        <Page
          title={'Location'}
          description={
            'Skip the line & order ahead for quick & easy pick-up or delivery.'
          }
          className=""
        >
          <DeliveryAddressConfirmDialog
            open={open}
            selectedAddress={selectedAddress}
            handleClose={handleClose}
            setSelectedAddress={setSelectedAddress}
            handleLCloseConfirm={handleLCloseConfirm}
          />
          {/* {(restaurantLoading || actionPerform) && (
              <Grid className={classes.dummyBg}>
                <LoadingBar />
              </Grid>
            )} */}
          <Grid
            xs={12}
            sm={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {orderType && loadDynamicMap ? (
              <Grid
                xs={12}
                sm={12}
                style={{ display: 'flex', width: '100%', height: '520px' }}
              >
                <GoogleMapComponent
                  zoom={zoom}
                  mapCenter={mapCenter}
                  markers={markers}
                  fitMapView={fitMapView}
                  setActionPerform={setActionPerform}
                  setIsMapLoaded={setIsMapLoaded}
                  action={action}
                  actionTypes={actionTypes}
                  currentLocation={currentLocation}
                  markerRef={markerRef}
                  filteredRestaurants={filteredRestaurants}
                />
              </Grid>
            ) : (
              <Grid xs={12} sm={12} style={{ display: 'flex', width: '100%' }}>
                <img
                  style={{ width: '100%' }}
                  alt=""
                  src={process.env.REACT_APP_IMAGE_LOCATION_PAGE}
                />
              </Grid>
            )}
            <Grid
              xs={12}
              sm={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Grid xs={12} sm={12}>
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
              </Grid>
            </Grid>
          </Grid>
        </Page>
      )}
    </>
  );
};

export default Location;
