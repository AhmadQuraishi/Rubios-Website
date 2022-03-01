import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import { getRestaurantCalendar } from '../../../../services/restaurant/calendar';
import {
  getSingleRestaurantCalendarSuccess,
  getSingleRestaurantCalendarFailure,
} from '../../../actions/basket/calendar';

function* asyncgetSingleRestaurantCalendarRequest(action: any): any {
  try {
    const response = yield call(
      getRestaurantCalendar,
      action.id,
      action.dateFrom,
      action.dateTo,
    );
    yield put(getSingleRestaurantCalendarSuccess(response));
  } catch (error) {
    yield put(getSingleRestaurantCalendarFailure(error));
  }
}

export function* singleRestaurantCalendarSaga() {
  yield takeEvery(
    basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR,
    asyncgetSingleRestaurantCalendarRequest,
  );
}
