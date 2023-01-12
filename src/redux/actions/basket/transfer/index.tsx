import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';
import { displayToast } from '../../../../helpers/toast';

export function basketTransferRequest(basketId: string, vendorId: string | number, deliveryMode: string) {
  return {
    type: basketActionsTypes.BASKET_TRANSFER_REQUEST,
    basketId,
    vendorId,
    deliveryMode
  };
}

export function basketTransferSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.BASKET_TRANSFER_SUCCESS,
    payload: data,
  };
}

export function basketTransferFailure(error: any) {
  // displayToast(
  //   'ERROR',
  //   error?.response?.data?.message
  //     ? error.response.data.message
  //     : 'ERROR! Please Try again later',
  // );
  return {
    type: basketActionsTypes.BASKET_TRANSFER_FAILURE,
    error: error,
  };
}

export function basketTransferReset() {
  return {
    type: basketActionsTypes.BASKET_TRANSFER_RESET,
  };
}
