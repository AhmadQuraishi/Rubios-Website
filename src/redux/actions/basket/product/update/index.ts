import { basketActionsTypes } from '../../../../types/basket';
import { ResponseBasket } from '../../../../../types/olo-api';
import { displayToast } from '../../../../../helpers/toast';

export function updateProductRequest(
  basketid: string,
  basketProductId: number,
  request: any,
) {
  return {
    type: basketActionsTypes.UPDATE_PRODUCT_REQUEST,
    basketid,
    basketProductId,
    request,
  };
}

export function updateProductSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.UPDATE_PRODUCT_SUCCESS,
    payload: data,
  };
}

export function updateProductFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try agin later',
  );
  return {
    type: basketActionsTypes.UPDATE_PRODUCT_FAILURE,
    error: error,
  };
}
