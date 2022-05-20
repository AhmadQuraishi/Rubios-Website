import axios from 'axios';
import { store } from '../../redux/store';
import { RequestCheckDeliveryCoverage } from '../../types/olo-api';

export const requestToVerifyDeliveryAddress = (
  resturantID: number,
  body: any,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/restaurants/64327/checkdeliverycoverage`, body)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
