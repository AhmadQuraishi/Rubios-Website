import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const GoogleMapComponent = ({
  zoom,
  mapCenter,
  markers,
  fitMapView,
  setActionPerform,
  setIsMapLoaded,
}: any) => {
  const mapRef = useRef();
  const [libraries] = useState<any>(['places']);
 const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY?.toString() || '',
    libraries,
  });

  const loadMap = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setActionPerform(false);
      setIsMapLoaded(true);
      fitMapView();
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
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapComponent;
