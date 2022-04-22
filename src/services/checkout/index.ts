import axios from 'axios';

import {
  RequestApplyCoupon,
  RequestUpdateBasketTip,
  RequestBasketSubmit,
  RequestBasketSubmitMultiple,
  RequestUpdateBasketTimeWanted,
} from '../../types/olo-api';
import { store } from '../../redux/store';
import axiosInstance from '../axiosInceptor';

export const applyCouponBasket = (
  basketid: string,
  body: RequestApplyCoupon,
) => {
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
};

export const removeCouponBasket = (basketid: string) => {
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
};

export const setTipAmountBasket = (
  basketid: string,
  body: RequestUpdateBasketTip,
) => {
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
};

export const setTimeWantedBasket = (
  basketid: string,
  body: RequestUpdateBasketTimeWanted,
) => {
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
};

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
};

export const validateBasket = (basketid: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/validate`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const submitSinglePaymentBasket = (
  basketid: string,
  body: any,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const multiplePaymentCheck = body.billingaccounts && body.billingaccounts.length;
    return axios
      .post(url + `/baskets/${basketid}/submit${multiplePaymentCheck ? '/multiplepayments' : ''}`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const submitMultiplePaymentBasket = (
  basketid: string,
  body: any,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/baskets/${basketid}/submit/multiplepayments`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const getBasketAllowedCards = (basketid: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .get(url + `/baskets/${basketid}/billingschemes`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const getGiftCardBalance = (
  basketId: string,
  billingSchemeId: string,
  body: any,
) => {
  try {
    console.log('works 2');
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(
        url +
          `/baskets/${basketId}/billingschemes/${billingSchemeId}/retrievebalance`,
        body,
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

export const verifyGiftCardPinRequirement = (
  billingSchemeId: string,
  body: any,
) => {
  try {
    console.log('works 2');
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .post(url + `/billingschemes/${billingSchemeId}/binvalidation`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
