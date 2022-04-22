import axios from 'axios';

export const removeRewardsFromBasket = (basketID: string, rewardid: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .delete(url + `/baskets/${basketID}/loyaltyrewards/${rewardid}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
