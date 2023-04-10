import axios from 'axios';

export const googleMapDigitalSignature = async (path: string) => {
  try {
    const payload = {
      path,
    };
    
    // const url = `${process.env.REACT_APP_OLO_PROXY_URL}/google/map/signature`;
    const url = `https://rubiosbackend-dev.azurewebsites.net/google/map/signature`;
    return axios
      .post(url, payload)
      .then((response) => {
        console.log('response', response);
        return response.data;
      })
      .catch((error) => {
        console.log('error', error);
        return error.response;
      });
  } catch (error) {
    return error;
  }
};
