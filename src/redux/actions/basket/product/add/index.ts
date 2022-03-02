import { basketActionsTypes } from '../../../../types/basket';
import { ResponseBasket } from '../../../../../types/olo-api';
import { displayToast } from '../../../../../helpers/toast';

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
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try agin later',
  );
  return {
    type: basketActionsTypes.ADD_PRODUCT_FAILURE,
    error: error,
  };
}
