import axios from 'axios';

export const applyRewardsByTokenAndVendorID = (basketID: string, body: any) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .put(url + `/baskets/${basketID}/loyaltyrewards/byref`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
