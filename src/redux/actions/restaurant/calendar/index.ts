import { restaurantCalendarActionsTypes } from '../../../types/restaurant/calendar';
import { ResponseRestaurantCalendars } from '../../../../types/olo-api';

export function getResturantCalendarRequest(
  id: number,
  dateFrom: string,
  dateTo: string,
) {
  return {
    type: restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_REQUEST,
    id,
    dateFrom,
    dateTo,
  };
}

export function getResturantCalendarRequestSuccess(
  data: ResponseRestaurantCalendars,
) {
  return {
    type: restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_SUCCESS,
    payload: data,
  };
}

export function getResturantCalendarRequestFailure(error: any) {
  return {
    type: restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_FAILURE,
    error: error,
  };
}
