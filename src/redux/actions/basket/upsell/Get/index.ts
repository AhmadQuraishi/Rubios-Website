import { basketActionsTypes } from '../../../../types/basket';
import { displayToast } from '../../../../../helpers/toast';

export function getUpsellsRequest(basketid: string) {
  return {
    type: basketActionsTypes.GET_UPSELLS_REQUEST,
    basketid,
  };
}

export function getUpsellsRequestSuccess(data: any) {
  return {
    type: basketActionsTypes.GET_UPSELLS_REQUEST_SUCCESS,
    payload: data,
  };
}

export function getUpsellsRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.GET_UPSELLS_REQUEST_FAILURE,
    error: error,
  };
}