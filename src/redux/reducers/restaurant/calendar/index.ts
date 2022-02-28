import { restaurantCalendarActionsTypes } from '../../../types/restaurant/calendar';

const INITIAL_STATE = {
  loading: false,
  calendar: null,
  error: {},
};

const restaurantCalendarReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_REQUEST:
      return { ...state, loading: true, calendar: null, error: {} };
    case restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_SUCCESS:
      return { ...state, loading: false, calendar: action.payload, error: {} };
    case restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default restaurantCalendarReducer;
