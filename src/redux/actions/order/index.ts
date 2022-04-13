import { orderActionTypes } from '../../types/order';
import { ResponseOrderStatus } from '../../../types/olo-api';
import { displayToast } from '../../../helpers/toast';

export function getOrderRequest(id: string | undefined) {
  return {
    type: orderActionTypes.GET_SINGLE_ORDER_REQUEST,
    id,
  };
}

export function getOrderRequestSuccess(data: ResponseOrderStatus) {
  return {
    type: orderActionTypes.GET_SINGLE_ORDER_REQUEST_SUCCESS,
    payload: data,
  };
}

export function getOrderRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );

  return {
    type: orderActionTypes.GET_SINGLE_ORDER_REQUEST_FAILURE,
    error: error,
  };
}

export function getOrderRestaurantRequest(vendorid: string | undefined) {
  return {
    type: orderActionTypes.GET_ORDER_RESTAURANT_REQUEST,
    vendorid,
  };
}

export function getOrderRestaurantRequestSuccess(data: ResponseOrderStatus) {
  return {
    type: orderActionTypes.GET_ORDER_RESTAURANT_REQUEST_SUCCESS,
    payload: data,
  };
}

export function getOrderRestaurantRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );

  return {
    type: orderActionTypes.GET_ORDER_RESTAURANT_REQUEST_FAILURE,
    error: error,
  };
}
