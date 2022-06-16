import { basketActionsTypes } from '../../../types/basket';
import { ResponseBasket } from '../../../../types/olo-api';
import {displayToast} from "../../../../helpers/toast";

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
  displayToast(
    'ERROR',
    error?.data?.error ? error.data.error : 'ERROR! Please Try again later',
  );
  return {
    type: basketActionsTypes.ADD_MULTIPLE_PRODUCT_FAILURE,
    error: error,
  };
}

export function updateMultipleProductsRequest(basketid: string, request: any) {
  console.log('iashdaihsd')
  return {
    type: basketActionsTypes.UPDATE_MULTIPLE_PRODUCT_REQUEST,
    basketid,
    request,
  };
}

export function updateMultipleProductsSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.UPDATE_MULTIPLE_PRODUCT_SUCCESS,
    payload: data,
  };
}

export function updateMultipleProductsFailure(error: any) {
  return {
    type: basketActionsTypes.UPDATE_MULTIPLE_PRODUCT_FAILURE,
    error: error,
  };
}
