import axios from 'axios';

export const requestToVerifyDeliveryAddress = (
  resturantID: number,
  body: any,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/restaurants/${resturantID}/checkdeliverycoverage`, body)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
