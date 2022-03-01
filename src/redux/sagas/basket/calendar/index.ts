import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import { getRestaurantCalendar } from '../../../../services/restaurant/calendar';
import { setTimeWantedBasket } from '../../../../services/basket';
import {
  getSingleRestaurantCalendarSuccess,
  getSingleRestaurantCalendarFailure,
  updateBasketTimeWantedSuccess,
  updateBasketTimeWantedFailure
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

function* asyncUpdateBasketTimeWanted(action: any): any {
  try {
    const response = yield call(
      setTimeWantedBasket,
      action.basketId,
      action.data
    );
    yield put(updateBasketTimeWantedSuccess(response));
  } catch (error) {
    yield put(updateBasketTimeWantedFailure(error));
  }
}

export function* singleRestaurantCalendarSaga() {
  yield takeEvery(
    basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR,
    asyncgetSingleRestaurantCalendarRequest,
  );
  yield takeEvery(
    basketActionsTypes.UPDATE_BASKET_TIME_WANTED,
    asyncUpdateBasketTimeWanted,
  );
}
