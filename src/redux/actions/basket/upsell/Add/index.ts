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

export function addUpsellsRequestSuccess(response: any) {
  console.log('response', response)
  if(response && response.errors && response.errors.length){
    response.errors.forEach((err: any) => {
      displayToast('ERROR', `${err.message}`);
    })
  }
  return {
    type: basketActionsTypes.ADD_UPSELLS_REQUEST_SUCCESS,
    payload: response.basket,
  };
}

export function addUpsellsRequestReset() {
  return {
    type: basketActionsTypes.ADD_UPSELLS_REQUEST_RESET
  };
}

export function addUpsellsRequestFailure(response: any) {
  console.log('response', response)
  if(response && response.errors && response.errors.length){
    response.errors.forEach((err: any) => {
      displayToast('ERROR', `${err.message}`);
    })
  }

  return {
    type: basketActionsTypes.ADD_UPSELLS_REQUEST_FAILURE
  };
}