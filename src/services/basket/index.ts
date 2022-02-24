import axios from 'axios';
import RequestCreateBasket, {
  RequestNewBasketProduct,
} from '../../types/olo-api';

export const getBasket = (basketid: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .get(url + `/baskets/${basketid}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const getDummyBasket = (body: RequestCreateBasket) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/create`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const addSingleProduct = (
  basketid: string,
  body: RequestNewBasketProduct,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/products?`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
