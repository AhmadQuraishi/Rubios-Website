import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import LocationCard from '../../components/location';
import './location.css';

const Location = () => {
  const containerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 32.715736,
    lng: -117.161087,
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyCWKuRHEkeFWOy0JDMBT7Z4YApPVkZYHFI">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <LocationCard />
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Location;
