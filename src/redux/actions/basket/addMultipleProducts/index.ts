import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';

export function addMultipleProductsRequest(basketid: string, request: any) {
  return {
    type: basketActionsTypes.ADD_MULTIPLE_PRODUCT_REQUEST,
    basketid,
    request,
  };
}

export function addMultipleProductsSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.ADD_MULTIPLE_PRODUCT_SUCCESS,
    payload: data,
  };
}

export function addMultipleProductsFailure(error: any) {
  return {
    type: basketActionsTypes.ADD_MULTIPLE_PRODUCT_FAILURE,
    error: error,
  };
}
