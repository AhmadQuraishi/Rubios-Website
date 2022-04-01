import { basketActionsTypes } from '../../../../types/basket';
import { ResponseBasket } from '../../../../../types/olo-api';
import { displayToast } from '../../../../../helpers/toast';

export function addUpsellsRequest(basketid: string, request: any) {
  return {
    type: basketActionsTypes.ADD_UPSELLS_REQUEST,
    basketid,
    request,
  };
}

export function addUpsellsRequestSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.ADD_UPSELLS_REQUEST_SUCCESS,
    payload: data,
  };
}

export function addUpsellsRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.ADD_UPSELLS_REQUEST_FAILURE,
    error: error,
  };
}
