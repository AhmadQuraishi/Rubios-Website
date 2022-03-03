import { restaurantListDataActionsTypes } from '../../../types/restaurant/list';
import { ResponseRestaurantList } from '../../../../types/olo-api';
import { displayToast } from '../../../../helpers/toast';

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
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try agin later',
  );
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
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try agin later',
  );
  return {
    type: restaurantListDataActionsTypes.GET_RESTAURANT_LIST_FAILURE,
    error: error,
  };
}
