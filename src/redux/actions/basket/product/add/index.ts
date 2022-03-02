import { basketActionsTypes } from '../../../../types/basket';
import { ResponseBasket } from '../../../../../types/olo-api';

export function addProductRequest(basketid: string, request: any) {
  return {
    type: basketActionsTypes.ADD_PRODUCT_REQUEST,
    basketid,
    request,
  };
}

export function addProductSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.ADD_PRODUCT_SUCCESS,
    payload: data,
  };
}

export function addProductFailure(error: any) {
  return {
    type: basketActionsTypes.ADD_PRODUCT_FAILURE,
    error: error,
  };
}
