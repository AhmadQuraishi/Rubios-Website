import axios from 'axios';
import { store } from '../../../redux/store';

export const getRewardsByTokenAndVendorID = (vendorID: string) => {
  try {
    debugger;
    const url = process.env.REACT_APP_OLO_API || '';

    const authtoken = process.env.REACT_APP_AUTH_TOKEN
      ? process.env.REACT_APP_AUTH_TOKEN
      : store.getState().authReducer.authToken.authtoken;

    return axios
      .get(url + `/users/${authtoken}/qualifyingrewards?vendorId=${vendorID}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
