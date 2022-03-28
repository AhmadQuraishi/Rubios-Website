import { restaurantCalendarActionsTypes } from '../../../types/restaurant/calendar';
import { ResponseRestaurantCalendars } from '../../../../types/olo-api';
import { displayToast } from '../../../../helpers/toast';

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
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_FAILURE,
    error: error,
  };
}
