import { takeEvery, put, call } from 'redux-saga/effects';
import { restaurantCalendarActionsTypes } from '../../../types/restaurant/calendar';
import { getRestaurantCalendar } from '../../../../services/restaurant/calendar';
import {
  getResturantCalendarRequestSuccess,
  getResturantCalendarRequestFailure,
} from '../../../actions/restaurant/calendar';

function* asyncResturantCalendarRequest(action: any): any {
  try {
    const response = yield call(
      getRestaurantCalendar,
      action.id,
      action.dateFrom,
      action.dateTo,
    );
    yield put(getResturantCalendarRequestSuccess(response));
  } catch (error) {
    yield put(getResturantCalendarRequestFailure(error));
  }
}

export function* restaurantCalendarSaga() {
  yield takeEvery(
    restaurantCalendarActionsTypes.GET_RESTAURANT_CALENDAR_REQUEST,
    asyncResturantCalendarRequest,
  );
}
