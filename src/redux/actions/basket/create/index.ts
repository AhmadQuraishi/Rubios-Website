import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';

export function setBasketRequest(
  request: any,
) {
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
  return {
    type: basketActionsTypes.SET_BASKET_FAILURE,
    error: error,
  };
}
