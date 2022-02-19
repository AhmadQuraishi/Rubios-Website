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
import ErrorMessageAlert from '../../components/error-message-alert';

const Location = () => {
  const { restaurants } = useSelector(
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
        return (
          <Marker
            key={index}
            position={latLong}
            icon={{
              url: '/marker.png',
            }}
          />
        );
      },
    );
  }

  return (
    <div style={{ minHeight: '300px' }}>
      {showError && showError !== '' && (
        <ErrorMessageAlert setOpen={true} message={showError} />
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
