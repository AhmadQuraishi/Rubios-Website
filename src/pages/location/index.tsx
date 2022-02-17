import { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LocationCard from '../../components/location';
import './location.css';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseRestaurant } from '../../types/olo-api';
import { getNearByResturantListRequest } from '../../redux/actions/restaurant/list';
import LoadingBar from '../../components/loading-bar';

const Location = () => {
  const { restaurants, loading, error } = useSelector(
    (state: any) => state.restaurantListReducer,
  );

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  const dispatch = useDispatch();

  const containerStyle = {
    width: '100%',
    height: '100vh',
  };

  let lat: number, long: number;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat + ' - ' + long);
      getNearByRestaurants(40.7054008, -74.0132198);
    });
  }, []);

  const getNearByRestaurants = (lat: number, long: number) => {
    var today = new Date();
    const dateTo =
      today.getFullYear() * 1e4 +
      (today.getMonth() + 1) * 100 +
      today.getDate() +
      '';
    const lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 6,
    );
    const dateFrom =
      lastWeekDate.getFullYear() * 1e4 +
      (lastWeekDate.getMonth() + 1) * 100 +
      lastWeekDate.getDate() +
      '';
    dispatch(
      getNearByResturantListRequest(lat, long, 15, 10, dateFrom, dateTo),
    );
  };

  let mapCenter: any;
  let newMarker: any;
  if (restaurants && restaurants.restaurants) {
    newMarker = restaurants.restaurants.map(
      (item: ResponseRestaurant, index: number) => {
        if (mapCenter == undefined) {
          mapCenter = {
            lat: item.latitude,
            lng: item.longitude,
          };
        }
        let latLong = {
          lat: item.latitude,
          lng: parseFloat(item.longitude),
        };
        return <Marker key={index} position={latLong} />;
      },
    );
  } else {
    mapCenter = {
      lat: 37.772,
      lng: -122.214,
    };
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
            <LocationCard restaurants={restaurants.restaurants} />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Location;
