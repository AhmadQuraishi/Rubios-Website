import axios from 'axios';
import { store } from '../../redux/store';
import {
  RequestCreateBasket,
  RequestNewBasketProduct,
  RequestBasketProductBatch,
  RequestBasketAddUpsell,
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
      .post(url + `/baskets/${basketid}/products`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const addMultipleProducts = (
  basketid: string,
  body: RequestBasketProductBatch,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/products/batch`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const removeProduct = (basketid: string, basketProductId: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .delete(url + `/baskets/${basketid}/products/${basketProductId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const updateProduct = (
  basketid: string,
  basketProductId: number,
  body: RequestNewBasketProduct,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .put(url + `/baskets/${basketid}/products/${basketProductId}`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const requestCreateBasket = (body: RequestCreateBasketFromOrder) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/createfromorder`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const requestCreateBasketForFav = (
  body: RequestCreateBasketFromFave,
) => {
  try {
    const auth_token = process.env.REACT_APP_AUTH_TOKEN
      ? process.env.REACT_APP_AUTH_TOKEN
      : store.getState().authReducer.authToken.authtoken;
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/createfromfave?authtoken=` + auth_token, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const getUpSells = (basketid: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .get(url + `/baskets/${basketid}/upsell`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const addUpSells = (basketid: string, body: RequestBasketAddUpsell) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/upsell`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
