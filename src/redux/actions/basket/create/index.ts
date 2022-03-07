import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';
import { displayToast } from '../../../../helpers/toast';

export function setBasketRequest(request: any) {
  return {
    type: basketActionsTypes.SET_BASKET_REQUEST,
    request,
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
      : 'ERROR! Please Try agin later',
  );
  return {
    type: basketActionsTypes.SET_BASKET_FAILURE,
    error: error,
  };
}

export function createBasketFromPrev(body: RequestCreateBasketFromOrder) {
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
      : 'ERROR! Please Try agin later',
  );
  return {
    type: basketActionsTypes.CREATE_BASKET_FROM_PREV_FAILURE,
    error: error,
  };
}