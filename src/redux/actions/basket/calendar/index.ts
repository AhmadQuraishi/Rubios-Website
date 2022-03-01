import { basketActionsTypes } from '../../../types/basket';
import {ResponseRestaurantCalendars, RequestUpdateBasketTimeWanted, ResponseBasket } from '../../../../types/olo-api';
import {displayToast} from '../../../../helpers/toast'
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
  displayToast('SUCCESS', 'Order Time updated.')
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED_SUCCESS,
    payload: data,
  };
}

export function updateBasketTimeWantedFailure(error: any) {
  displayToast('ERROR', 'ERROR! Please Try agin later')

  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED_FAILURE,
    error: error
  };
}

export function deleteBasketTimeWanted(basketId: string) {
  return {
    type: basketActionsTypes.DELETE_BASKET_TIME_WANTED,
    basketId
  };
}

export function deleteBasketTimeWantedSuccess(data: ResponseBasket) {
  displayToast('SUCCESS', 'Order Time updated to ASAP.')
  return {
    type: basketActionsTypes.DELETE_BASKET_TIME_WANTED_SUCCESS,
    payload: data,
  };
}

export function deleteBasketTimeWantedFailure(error: any) {
  displayToast('ERROR', 'ERROR! Please Try agin later')

  return {
    type: basketActionsTypes.DELETE_BASKET_TIME_WANTED_FAILURE,
    error: error
  };
}


