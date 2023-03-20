import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const GoogleMapComponent = ({
  zoom,
  mapCenter,
  markers,
  fitMapView,
  setActionPerform,
  setIsMapLoaded,
  action,
  actionTypes,
  currentLocation,
  markerRef,
  filteredRestaurants,
}: any) => {
  const mapRef: any = useRef();
  const [libraries] = useState<any>(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY?.toString() || '',
    libraries,
  });

  const loadMap = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (mapRef?.current && window.google) {
      console.log('mapRef', mapRef.current);
      console.log('markerRef', markerRef);

      const map = mapRef?.current;

      if (map && markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker: any, index: any) => {
          bounds.extend(markerRef.current[index].getPosition());
        });
        map.fitBounds(bounds);
      }
    }
    // debugger;
  }, [mapRef.current, window.google, filteredRestaurants]);

  useEffect(() => {
    if (isLoaded) {
      setActionPerform(false);
      setIsMapLoaded(true);
      fitMapView();
      if (action === actionTypes.CURRENT_LOCATION) {
        currentLocation();
      }
    }
  }, [isLoaded]);
  useEffect(() => {
    setActionPerform(true);
  }, []);

  return isLoaded && window.google ? (
    <GoogleMap
      mapContainerStyle={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
      id={'google-map-location'}
      // zoom={10}
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
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapComponent;
