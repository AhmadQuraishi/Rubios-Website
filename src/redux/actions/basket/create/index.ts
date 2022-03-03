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
