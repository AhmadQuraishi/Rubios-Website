import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';

export function getDummyBasketRequest(
  request: any,
) {
  return {
    type: basketActionsTypes.GET_DUMMY_BASKET_REQUEST,
    request,
  };
}

export function getDummyBasketRequestSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.GET_DUMMY_BASKET_SUCCESS,
    payload: data,
  };
}

export function getDummyBasketRequestFailure(error: any) {
  return {
    type: basketActionsTypes.GET_DUMMY_BASKET_FAILURE,
    error: error,
  };
}
