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
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displayToast } from '../../helpers/toast';
import './index.css';
import Page from '../../components/page-title';
import { removeTestingStores } from '../../helpers/common';

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
    if (type !== 'delivery') {
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

  useEffect(() => {
    if (LatLng && actionPerform) {
      if (LatLng) {
        getNearByRestaurants(LatLng.lat, LatLng.lng);
      }
    } else if (showNearBy && orderType && orderType === 'delivery') {
      if (navigator.geolocation) {
        console.log('geolocation', navigator.geolocation);
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // getNearByRestaurants(32.7711693, -117.1419628);
            getNearByRestaurants(
              position.coords.latitude,
              position.coords.longitude,
            );
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
        //     // if (orderType === 'delivery') {
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
          setfilteredRestaurants(removeTestingStores(restaurants.restaurants));
        }
        setAllResturants(removeTestingStores(restaurants.restaurants));
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
              removeTestingStores(nearbyRestaurants.restaurants),
            );
            setActionPerform(false);
          }
          setLatLng(null);
          if (showNearBy) {
            console.log('ppppppp');
            // if (orderType === 'delivery') {
            //   setDeliveryRasturants(restaurants.restaurants);
            // } else {
            //   console.log('ppppppp 2', restaurants.restaurants);
            setDeliveryRasturants(
              removeTestingStores(nearbyRestaurants.restaurants),
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
            setfilteredRestaurants(removeTestingStores(nearbyRestaurants.restaurants));
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
      } else if (orderType === 'delivery') {
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
        : orderType && orderType !== 'delivery'
        ? filteredRestaurants
        : orderType && orderType === 'delivery'
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

  return (
    <Page title={'Location'} className="">
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
              />
            </GoogleMap>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Location;
