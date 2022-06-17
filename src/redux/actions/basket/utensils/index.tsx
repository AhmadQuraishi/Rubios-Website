import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';
import { displayToast } from '../../../../helpers/toast';

export function addUtensilsRequest(basketid: string, request: any) {
  return {
    type: basketActionsTypes.ADD_UTENSILS_REQUEST,
    basketid,
    request,
  };
}

export function addUtensilsRequestSuccess(data: ResponseBasket) {
  displayToast('SUCCESS', 'Utensils added.');
  return {
    type: basketActionsTypes.ADD_UTENSILS_SUCCESS,
    payload: data,
  };
}

export function addUtensilsRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.ADD_UTENSILS_FAILURE,
    error: error,
  };
}

export function removeUtensilsRequest(basketid: string, basketProductId: number,) {
  return {
    type: basketActionsTypes.REMOVE_UTENSILS_REQUEST,
    basketid,
    basketProductId,
  };
}

export function removeUtensilsRequestSuccess(data: ResponseBasket) {
  displayToast('SUCCESS', 'Utensils removed.');
  return {
    type: basketActionsTypes.REMOVE_UTENSILS_SUCCESS,
    payload: data,
  };
}

export function removeUtensilsRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.REMOVE_UTENSILS_FAILURE,
    error: error,
  };
}
