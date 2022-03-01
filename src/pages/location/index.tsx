import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LocationCard from '../../components/location';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseRestaurant } from '../../types/olo-api';
import {
  getNearByResturantListRequest,
  getResturantListRequest,
} from '../../redux/actions/restaurant/list';
import LoadingBar from '../../components/loading-bar';
import { Alert, Snackbar, Slide, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
  }
}));

const Location = () => {
  const classes = useStyles();
  const { restaurants, loading } = useSelector(
    (state: any) => state.restaurantListReducer,
  );

  const [mapCenter, setMapCenter] = useState<any>();
  const [showNearBy, setShowNearBy] = useState(false);
  const [orderType, setOrderType] = useState<string>();
  const [showError, setShowError] = useState<string>();
  const [nearByRestaurantsFound, setNearByRestaurantsFound] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setMapCenter({
      lat: 37.772,
      lng: -122.214,
    });
    dispatch(getResturantListRequest());
  }, []);

  useEffect(() => {
    if (showNearBy) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          //getNearByRestaurants(40.7054008, -74.0132198);
          getNearByRestaurants(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        function () {
          setShowNearBy(false);
        },
      );
    }
  }, [showNearBy]);

  useEffect(() => {
    if (restaurants && restaurants.restaurants) {
      if (restaurants.restaurants.length === 0) {
        if (showNearBy) {
          setShowNearBy(false);
          setNearByRestaurantsFound(false);
          setShowError(
            "We could not find any Rubio's within 10 Miles of Your Current Location.",
          );
          dispatch(getResturantListRequest());
        }
      } else {
        if (showNearBy) {
          setShowNearBy(false);
          setNearByRestaurantsFound(true);
        }
        setMapCenter({
          lat: restaurants.restaurants[0].latitude,
          lng: restaurants.restaurants[0].longitude,
        });
      }
    }
  }, [restaurants]);

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
    dispatch(
      getNearByResturantListRequest(lat, long, 10, 10, dateFrom, dateTo),
    );
  };

  let newMarker: any;
  if (restaurants && restaurants.restaurants.length > 0) {
    newMarker = restaurants.restaurants.map(
      (item: ResponseRestaurant, index: number) => {
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
        return <Marker key={index} position={latLong} />;
      },
    );
  }

  return (
    <div style={{ minHeight: '300px', position: 'relative' }}>
      {showError && showError !== '' && (
        <Snackbar
          open={showError != '' ? true : false}
          autoHideDuration={6000}
          TransitionComponent={Slide}
          onClose={() => {
            setShowError('');
          }}
        >
          <Alert
            onClose={() => {
              setShowError('');
            }}
            severity="error"
            variant="filled"
            sx={{ width: '100%', alignItems: 'center' }}
          >
            {showError}
          </Alert>
        </Snackbar>
      )}
      {loading && (
        <div className={classes.dummyBg}>
          <LoadingBar />
        </div>
      )}
      <LoadScript googleMapsApiKey="AIzaSyCWKuRHEkeFWOy0JDMBT7Z4YApPVkZYHFI">
        <GoogleMap center={mapCenter} zoom={7}>
          {newMarker}
          <LocationCard
            isNearByRestaurantList={nearByRestaurantsFound}
            restaurants={(restaurants && restaurants.restaurants) || []}
            setOrderTypeMain={setOrderType}
            setShowNearBy={setShowNearBy}
            setShowError={setShowError}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Location;
