import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import { getRestaurantCalendar } from '../../../../services/restaurant/calendar';
import { setTimeWantedBasket, deleteTimeWantedBasket } from '../../../../services/basket';
import {
  getSingleRestaurantCalendarSuccess,
  getSingleRestaurantCalendarFailure,
  updateBasketTimeWantedSuccess,
  updateBasketTimeWantedFailure,
  deleteBasketTimeWantedSuccess,
  deleteBasketTimeWantedFailure
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

function* asyncDeleteBasketTimeWanted(action: any): any {
  try {
    const response = yield call(
      deleteTimeWantedBasket,
      action.basketId
    );
    yield put(deleteBasketTimeWantedSuccess(response));
  } catch (error) {
    yield put(deleteBasketTimeWantedFailure(error));
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
  yield takeEvery(
    basketActionsTypes.DELETE_BASKET_TIME_WANTED,
    asyncDeleteBasketTimeWanted,
  );
}
