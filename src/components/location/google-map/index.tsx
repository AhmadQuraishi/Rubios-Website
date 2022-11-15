import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import LocationCard from '../index';
import usePlacesAutocomplete from 'use-places-autocomplete';

const mapContainerStyle = {
  width: '100%',
  height: 'auto',
};

const GoogleMapComponent = ({
  zoom,
  mapCenter,
  markers,
  actionTypes,
  setAction,
  orderType,
  changeOrderType,
  setLatLng,
  setActionPerform,
  deliveryAddressString,
  setDeliveryAddressString,
  allRestaurants,
  setFilteredRestaurants,
  filteredRestaurants,
  loading,
  addCustomAddressCheck,
  currentLocation,
  setRestaurantNotFound,
  restaurantNotFound,
  hideCurrentLocation,
  getNearByRestaurants,
}: any) => {
  const mapRef = useRef();
  const [libraries] = useState<any>(['places']);
  const [mapLoaded, setMapLoaded] = useState<any>(false);
  const [requestOptions, setRequestOptions] = useState({});
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY?.toString() || '',
    libraries,
  });

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    requestOptions: {
      location:
        window.google && new google.maps.LatLng({ lat: 37.772, lng: -122.214 }),
      radius: 200 * 1000,
    },
  });

  const loadMap = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    setMapLoaded(isLoaded);
    if (isLoaded) {
      init();
      // setRequestOptions({
      //   location:
      //     window.google &&
      //     new google.maps.LatLng({ lat: 37.772, lng: -122.214 }),
      //   radius: 200 * 1000,
      // });
    }
    console.log('mapLoaded', isLoaded);
  }, [isLoaded]);

  return mapLoaded && window.google ? (
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
        // onClick={() => {
        //   setMayLocation();
        // }}
        className="location-icon-panel"
      >
        <span className="icon"></span>
      </div>
      <LocationCard
        actionTypes={actionTypes}
        setAction={setAction}
        orderType={orderType}
        changeOrderType={changeOrderType}
        setLatLng={setLatLng}
        setActionPerform={setActionPerform}
        deliveryAddressString={deliveryAddressString}
        setDeliveryAddressString={setDeliveryAddressString}
        allRestaurants={allRestaurants}
        setFilteredRestaurants={setFilteredRestaurants}
        filteredRestaurants={filteredRestaurants}
        loading={loading}
        addCustomAddressCheck={addCustomAddressCheck}
        currentLocation={currentLocation}
        setRestaurantNotFound={setRestaurantNotFound}
        restaurantNotFound={restaurantNotFound}
        hideCurrentLocation={hideCurrentLocation}
        getNearByRestaurants={getNearByRestaurants}
        value={value}
        setValue={setValue}
        clearSuggestions={clearSuggestions}
        status={status}
        data={data}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapComponent;
