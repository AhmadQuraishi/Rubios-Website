import axios from 'axios';

export const googleMapDigitalSignature = async (path: string) => {
  try {
    const payload = {
      path,
    };

    const url = `${process.env.REACT_APP_OLO_PROXY_URL}/google/map/signature`;
    return axios
      .post(url, payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  } catch (error) {
    return error;
  }
};
