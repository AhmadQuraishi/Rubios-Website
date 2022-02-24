import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';

export function addSingleProductRequest(basketid: string, request: any) {
  return {
    type: basketActionsTypes.ADD_SINGLE_PRODUCT_REQUEST,
    basketid,
    request,
  };
}

export function addSingleProducttSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.ADD_SINGLE_PRODUCT_SUCCESS,
    payload: data,
  };
}

export function addSingleProductFailure(error: any) {
  return {
    type: basketActionsTypes.ADD_SINGLE_PRODUCT_FAILURE,
    error: error,
  };
}
