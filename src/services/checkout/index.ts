import axios from 'axios';

import {
  RequestApplyCoupon,
  RequestUpdateBasketTip,
  RequestBasketSubmit,
  RequestUpdateBasketTimeWanted
} from '../../types/olo-api';

export const applyCouponBasket = (basketid: string, body: RequestApplyCoupon) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .put(url + `/baskets/${basketid}/coupon`, body)
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
      .put(url + `/baskets/${basketid}/tip`, body)
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

export const deleteTimeWantedBasket = (basketid: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .delete(url + `/baskets/${basketid}/timewanted`)
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
