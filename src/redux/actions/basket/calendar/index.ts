import { basketActionsTypes } from '../../../types/basket';
import {ResponseRestaurantCalendars, RequestUpdateBasketTimeWanted, ResponseBasket } from '../../../../types/olo-api';

export function getSingleRestaurantCalendar(id: number, dateFrom: string, dateTo: string,) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR,
    id,
    dateFrom,
    dateTo
  };
}

export function getSingleRestaurantCalendarSuccess(data: ResponseRestaurantCalendars) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_SUCCESS,
    payload: data
  };
}

export function getSingleRestaurantCalendarFailure(error: any) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_FAILURE,
    error: error,
  };
}

export function updateBasketTimeWanted(basketId: string, data: RequestUpdateBasketTimeWanted) {
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED,
    basketId,
    data
  };
}

export function updateBasketTimeWantedSuccess(data: ResponseBasket) {
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED_SUCCESS,
    payload: data,
  };
}

export function updateBasketTimeWantedFailure(error: any) {
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED_FAILURE,
    error: error
  };
}


