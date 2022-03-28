import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket, RequestSetDeliveryMode } from '../../../../types/olo-api';
import { displayToast } from '../../../../helpers/toast';

export function setBasketRequest(request: any) {
  return {
    type: basketActionsTypes.SET_BASKET_REQUEST,
    request
  };
}

export function setBasketRequestSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.SET_BASKET_SUCCESS,
    payload: data,
  };
}

export function setBasketRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.SET_BASKET_FAILURE,
    error: error,
  };
}

export function createBasketFromPrev(body: any) {
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_PREV,
    body,
  };
}

export function createBasketFromPrevSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_PREV_SUCCESS,
    payload: data,
  };
}

export function createBasketFromPrevFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_PREV_FAILURE,
    error: error,
  };
}

export function createBasketFromPrevOrderRequest(
  body: RequestCreateBasketFromOrder,
) {
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_REQUEST,
    body,
  };
}

export function createBasketFromPrevOrderSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_SUCCESS,
    payload: data,
  };
}

export function createBasketFromPrevOrderFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_FAILURE,
    error: error,
  };
}

export function createBasketFromFavOrderRequest(
  body: RequestCreateBasketFromFave,
) {
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_REQUEST,
    body,
  };
}

export function createBasketFromFavOrderSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_SUCCESS,
    payload: data,
  };
}

export function createBasketFromFavOrderFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_FAILURE,
    error: error,
  };
}

export function setBasketDeliveryMode(basketid: string, payload: RequestSetDeliveryMode) {
  return {
    type: basketActionsTypes.SET_BASKET_DELIVERY_MODE_REQUEST,
    basketid,
    payload
  };
}

export function setBasketDeliveryModeSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.SET_BASKET_DELIVERY_MODE_SUCCESS,
    payload: data,
  };
}

export function setBasketDeliveryModeFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.SET_BASKET_DELIVERY_MODE_FAILURE,
    error: error,
  };
}
