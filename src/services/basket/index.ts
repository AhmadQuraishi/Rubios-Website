import axios from 'axios';
import { store } from '../../redux/store';
import {
  RequestCreateBasket,
  RequestNewBasketProduct,
  RequestBasketProductBatch,
  RequestBasketAddUpsell,
  RequestSetDeliveryMode,
  RequestDeliveryAddress,
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

export const setBasketDeliveryMode = (
  basketid: string,
  body: RequestSetDeliveryMode,
) => {
  try {

    console.log('basketid', basketid)
    console.log('body', body)
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .put(url + `/baskets/${basketid}/deliverymode`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const setBasketDeliveryAddress = async (
  basketid: string,
  body: RequestDeliveryAddress,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return await axios
      .put(url + `/baskets/${basketid}/deliveryaddress`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const setBasketCustomFields = (basketid: string, customFields: any) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const requests: any = [];
    customFields.forEach((element: any) => {
      requests.push(
        axios.put(url + `/baskets/${basketid}/customfields`, element),
      );
    });
    return axios.all(requests).catch((error) => {
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

export const updateMultipleProducts = (
  basketid: string,
  body: RequestBasketProductBatch,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .put(url + `/baskets/${basketid}/products/batch`, body)
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
    const auth_token = store.getState().authReducer.authToken.authtoken;
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

export const createGuestUser = () => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const payload = {
      password: 'asdf1234',
      optin: true,
    };
    return axios
      .post(
        url + `/orders/a98726df-1cd1-ec11-a9c9-aad2a287f600/createuser`,
        payload,
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
