import React from 'react'
import { GoogleMap, useJsApiLoader , } from '@react-google-maps/api';
import LocationCard from "../location";

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 32.715736,
  lng: -117.161087
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCWKuRHEkeFWOy0JDMBT7Z4YApPVkZYHFI",

  })

  const [map, setMap] = React.useState(null)

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}

      // onLoad={onLoad}
      onUnmount={onUnmount}
    ><LocationCard/>
      { /* Child components, such as markers, info windows, etc. */}

      <></>
    </GoogleMap>

  ) : <></>
}

export default React.memo(Map)
