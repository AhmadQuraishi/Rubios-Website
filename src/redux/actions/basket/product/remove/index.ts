import { basketActionsTypes } from '../../../../types/basket';
import { ResponseBasket } from '../../../../../types/olo-api';
import { displayToast } from '../../../../../helpers/toast';

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
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.REMOVE_PRODUCT_FAILURE,
    error: error,
  };
}
