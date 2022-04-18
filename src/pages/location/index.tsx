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
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { displayToast } from '../../helpers/toast';
import './index.css';

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

const Location = () => {
  const classes = useStyles();
  const { restaurants, loading } = useSelector(
    (state: any) => state.restaurantListReducer,
  );

  const [mapCenter, setMapCenter] = useState<any>();
  const [showNearBy, setShowNearBy] = useState(false);
  const [orderType, setOrderType] = useState<string>();
  const [zoom, setZoom] = useState<number>(7);
  const [nearByRestaurantsFound, setNearByRestaurantsFound] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setMapCenter({
      lat: 37.772,
      lng: -122.214,
    });
    dispatch(getResturantListRequest());
  }, []);

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

  useEffect(() => {
    if (showNearBy) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          //getNearByRestaurants(40.7054008, -74.0132198);
          getNearByRestaurants(
            position.coords.latitude,
            position.coords.longitude,
          );
          setZoom(7);
        },
        function () {
          setShowNearBy(false);
          setZoom(7);
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
          displayToast(
            'ERROR',
            "We could not find any Rubio's within 10 Miles of Your Current Location.",
          );
          dispatch(getResturantListRequest());
          setZoom(7);
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
        setZoom(7);
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
  const [markers, setMarkers] = useState<any[]>([]);
  useEffect(() => {
    setMarkers([]);
    if (restaurants && restaurants.restaurants.length > 0) {
      restaurants.restaurants.map((item: ResponseRestaurant, index: number) => {
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
  }, [restaurants]);

  return (
    <div
      style={{ minHeight: '300px', position: 'relative' }}
      role="region"
      aria-label="map"
    >
      {loading && (
        <div className={classes.dummyBg}>
          <LoadingBar />
        </div>
      )}
      <LoadScript googleMapsApiKey="AIzaSyCWKuRHEkeFWOy0JDMBT7Z4YApPVkZYHFI">
        <GoogleMap
          center={mapCenter}
          zoom={zoom}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <div
            onClick={() => {
              setMayLocation();
            }}
            className="location-icon-panel"
          >
            <span className="icon"></span>
          </div>
          {markers}
          <LocationCard
            isNearByRestaurantList={nearByRestaurantsFound}
            restaurants={(restaurants && restaurants.restaurants) || []}
            setOrderTypeMain={setOrderType}
            setShowNearBy={setShowNearBy}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Location;
