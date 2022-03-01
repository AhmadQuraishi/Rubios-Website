import axios from 'axios';


import RequestCreateBasket from '../../types/olo-api';
import {RequestNewBasketProduct} from '../../types/olo-api';
import {RequestApplyCoupon} from '../../types/olo-api';
import RequestUpdateBasketTip from '../../types/olo-api';
import RequestUpdateBasketTimeWanted from '../../types/olo-api';
import {RequestBasketSubmit} from '../../types/olo-api';

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

export const applyCouponBasket = (basketid: string, body: RequestApplyCoupon) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/coupon`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

export const deleteCouponBasket = (basketid: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .delete(url + `/baskets/${basketid}/coupon`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

export const setTipAmountBasket = (basketid: string, body: RequestUpdateBasketTip) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/tip`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

export const setTimeWantedBasket = (basketid: string, body: RequestUpdateBasketTimeWanted) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .put(url + `/baskets/${basketid}/timewanted`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

export const submitSinglePaymentBasket = (basketid: string, body: RequestBasketSubmit) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/submit`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}
