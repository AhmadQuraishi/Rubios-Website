import { basketActionsTypes } from '../../types/basket';
import { ResponseBasket } from '../../../types/olo-api';

export function getBasketRequest(basketid: string, updatedBasket: any = {}) {
  return {
    type: basketActionsTypes.GET_BASKET_REQUEST,
    basketid,
    updatedBasket,
  };
}

export function getBasketRequestSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.GET_BASKET_SUCCESS,
    payload: data,
  };
}

export function getBasketRequestFailure(error: any) {
  return {
    type: basketActionsTypes.GET_BASKET_FAILURE,
    error: error,
  };
}
