import axios from 'axios';
import { store } from '../../../redux/store';

export const getRewardsByTokenAndVendorID = (
  vendorID: string,
  authToken: string,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';

    return axios
      .get(url + `/users/${authToken}/qualifyingrewards?vendorId=${vendorID}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
