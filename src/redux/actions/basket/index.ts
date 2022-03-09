import { basketActionsTypes } from '../../types/basket';
import { ResponseBasket } from '../../../types/olo-api';

export function getBasketRequest(
  basketid: string,
  updatedBasket: any = {},
  basketType: string = 'New',
) {
  return {
    type: basketActionsTypes.GET_BASKET_REQUEST,
    basketid,
    updatedBasket,
    basketType,
  };
}

export function getBasketRequestSuccess(
  data: ResponseBasket,
  basketType: string = 'New',
) {
  return {
    type: basketActionsTypes.GET_BASKET_SUCCESS,
    payload: data,
    basketType: basketType,
  };
}

export function getBasketRequestFailure(error: any) {
  return {
    type: basketActionsTypes.GET_BASKET_FAILURE,
    error: error,
  };
}
