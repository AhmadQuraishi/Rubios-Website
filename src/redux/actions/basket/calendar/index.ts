import { basketActionsTypes } from '../../../types/basket';
import { ResponseRestaurantCalendars } from '../../../../types/olo-api';

export function getSingleRestaurantCalendar(id: number, dateFrom: string, dateTo: string,) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR,
    id,
    dateFrom,
    dateTo,
  };
}

export function getSingleRestaurantCalendarSuccess(data: ResponseRestaurantCalendars) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_SUCCESS,
    payload: data,
  };
}

export function getSingleRestaurantCalendarFailure(error: any) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_FAILURE,
    error: error,
  };
}
