import { basketActionsTypes } from '../../../../types/basket';
import { ResponseBasket } from '../../../../../types/olo-api';

export function removeProductRequest(
  basketid: string,
  basketProductId: number,
) {
  return {
    type: basketActionsTypes.REMOVE_PRODUCT_REQUEST,
    basketid,
    basketProductId,
  };
}

export function removeProductSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.REMOVE_PRODUCT_SUCCESS,
    payload: data,
  };
}

export function removeProductFailure(error: any) {
  return {
    type: basketActionsTypes.REMOVE_PRODUCT_FAILURE,
    error: error,
  };
}
