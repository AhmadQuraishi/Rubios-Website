import { restaurantListDataActionsTypes } from '../../../types/restaurant/list';
import { ResponseRestaurantList } from '../../../../types/olo-api';

export function getNearByResturantListRequest(
  lat: number,
  long: number,
  radius: number,
  limit: number,
  startDate: string,
  endDate: string,
) {
  return {
    type: restaurantListDataActionsTypes.GET_RESTAURANT_LIST_REQUEST,
    lat,
    long,
    radius,
    limit,
    startDate,
    endDate,
  };
}

export function getNearByResturantListRequestSuccess(
  data: ResponseRestaurantList,
) {
  return {
    type: restaurantListDataActionsTypes.GET_RESTAURANT_LIST_SUCCESS,
    payload: data,
  };
}

export function getNearByResturantListRequestFailure(error: any) {
  return {
    type: restaurantListDataActionsTypes.GET_RESTAURANT_LIST_FAILURE,
    error: error,
  };
}

export function getResturantListRequest() {
  return {
    type: restaurantListDataActionsTypes.GET_RESTAURANT_LIST_REQUEST,
  };
}

export function getResturantListRequestSuccess(data: ResponseRestaurantList) {
  return {
    type: restaurantListDataActionsTypes.GET_RESTAURANT_LIST_SUCCESS,
    payload: data,
  };
}

export function getResturantListRequestFailure(error: any) {
  return {
    type: restaurantListDataActionsTypes.GET_RESTAURANT_LIST_FAILURE,
    error: error,
  };
}
