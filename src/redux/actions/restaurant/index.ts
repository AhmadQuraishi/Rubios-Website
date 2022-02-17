import { restaurantActionsTypes } from '../../types/restaurant';
import { ResponseRestaurant } from '../../../types/olo-api';

export function getResturantInfoRequest(id: number) {
  return {
    type: restaurantActionsTypes.GET_RESTAURANT_INFO_REQUEST,
    restaurantID: id,
  };
}

export function getResturantInfoRequestSuccess(data: ResponseRestaurant) {
  return {
    type: restaurantActionsTypes.GET_RESTAURANT_INFO_SUCCESS,
    payload: data,
  };
}

export function getResturantInfoRequestFailure(error: any) {
  return {
    type: restaurantActionsTypes.GET_RESTAURANT_INFO_FAILURE,
    error: error,
  };
}

export function setResturantInfoRequest(restaurant: ResponseRestaurant, orderType: string) {
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_INFO_REQUEST,
    restaurant,
    orderType
  };
}

export function setResturantInfoRequestSuccess(data: ResponseRestaurant, orderType: string) {
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_INFO_SUCCESS,
    payload: data,
    orderType
  };
}

export function setResturantInfoRequestFailure(error: any) {
  return {
    type: restaurantActionsTypes.SET_RESTAURANT_INFO_FAILURE,
    error: error,
  };
}
