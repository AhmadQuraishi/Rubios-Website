import { restaurantActionsTypes } from '../../types/restaurant';
import { ResponseRestaurant } from '../../../types/olo-api';
import { displayToast } from '../../../helpers/toast';

export function getResturantInfoRequest(id: number) {
  return {
    type: restaurantActionsTypes.GET_RESTAURANT_INFO_REQUEST,
    restaurantID: id,
  };
}

export function resetRestaurantRequest() {
  return {
    type: restaurantActionsTypes.RESTAURANT_RESET_REQUEST,
  };
}

export function updateSessionRequest(sessionTime: any) {
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_SESSION_REQUEST,
    sessionTime
  };
}

export function updateSessionNull(sessionTime: any) {
  return {
    type: restaurantActionsTypes.SET_SESSION_REQUEST,
    sessionTime
  };
}

export function getResturantInfoRequestSuccess(data: ResponseRestaurant) {
  return {
    type: restaurantActionsTypes.GET_RESTAURANT_INFO_SUCCESS,
    payload: data,
  };
}
export function promotionalMsg() {
  return {
    type: restaurantActionsTypes.SET_PROMOTIONAL_MSG,
  }
}

export function getResturantInfoRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: restaurantActionsTypes.GET_RESTAURANT_INFO_FAILURE,
    error: error,
  };
}

export function setResturantInfoRequest(
  restaurant: ResponseRestaurant | null,
  orderType: string,
) {
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_INFO_REQUEST,
    restaurant,
    orderType,
  };
}

export function setResturantInfoRequestSuccess(
  data: ResponseRestaurant,
  orderType: string,
) {
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_INFO_SUCCESS,
    payload: data,
    orderType,
  };
}

export function setResturantInfoRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_INFO_FAILURE,
    error: error,
  };
}

export function setRestaurantInfoOrderType(orderType: string) {
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_INFO_ORDER_TYPE,
    orderType,
  };
}
