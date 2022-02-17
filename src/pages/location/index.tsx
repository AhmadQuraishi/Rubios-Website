import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LocationCard from '../../components/location';
import './location.css';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseRestaurant } from '../../types/olo-api';
import {
  getNearByResturantListRequest,
  getResturantListRequest,
} from '../../redux/actions/restaurant/list';
import LoadingBar from '../../components/loading-bar';

const Location = () => {
  const { restaurants, loading, error } = useSelector(
    (state: any) => state.restaurantListReducer,
  );

  const [mapCenter, setMapCenter] = useState<any>();
  const [showNearBy, setShowNearBy] = useState(false);

  useEffect(() => {
    if (
      restaurants &&
      restaurants.restaurants &&
      restaurants.restaurants.length == 0
    ) {
      setMapCenter({
        lat: 37.772,
        lng: -122.214,
      });
      if (showNearBy) {
        setShowNearBy(false);
        dispatch(getResturantListRequest());
      }
    }
    if (
      restaurants &&
      restaurants.restaurants &&
      restaurants.restaurants.length > 0
    ) {
      setMapCenter({
        lat: restaurants.restaurants[0].latitude,
        lng: restaurants.restaurants[0].longitude,
      });
    }
  }, [restaurants]);

  const dispatch = useDispatch();

  const containerStyle = {
    width: '100%',
  };

  let lat: number, long: number;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      setShowNearBy(true);
      //DUMMY LAT, LONG = 40.7054008, -74.0132198
      getNearByRestaurants(lat, long);
    });
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (result) {
        // Will return ['granted', 'prompt', 'denied']
        if (result.state == 'denied') {
          dispatch(getResturantListRequest());
        }
      });
  }, []);

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
  if (restaurants && restaurants.restaurants) {
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
  } else {
  }
  return (
    <>
      {loading == true && <LoadingBar />}
      <LoadScript googleMapsApiKey="AIzaSyCWKuRHEkeFWOy0JDMBT7Z4YApPVkZYHFI">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={7}
        >
          {newMarker}
          {restaurants && restaurants.restaurants && (
            <LocationCard
              isNearByRestaurantList={showNearBy}
              restaurants={restaurants.restaurants}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Location;
