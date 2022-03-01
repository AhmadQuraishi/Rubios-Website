import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import { getRestaurantCalendar } from '../../../../services/restaurant/calendar';
import { setTimeWantedBasket, deleteTimeWantedBasket, setTipAmountBasket, applyCouponBasket } from '../../../../services/checkout';
import {
  getSingleRestaurantCalendarSuccess,
  getSingleRestaurantCalendarFailure,
  updateBasketTimeWantedSuccess,
  updateBasketTimeWantedFailure,
  deleteBasketTimeWantedSuccess,
  deleteBasketTimeWantedFailure,
  updateBasketTipAmountSuccess,
  updateBasketTipAmountFailure,
  updateBasketCouponCodeSuccess,
  updateBasketCouponCodeFailure
} from '../../../actions/basket/checkout';

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

function* asyncUpdateBasketTipAmount(action: any): any {
  try {
    const response = yield call(
      setTipAmountBasket,
      action.basketId,
      action.data
    );
    yield put(updateBasketTipAmountSuccess(response));
  } catch (error) {
    yield put(updateBasketTipAmountFailure(error));
  }
}

function* asyncUpdateBasketCouponCode(action: any): any {
  try {
    const response = yield call(
      applyCouponBasket,
      action.basketId,
      action.data
    );
    yield put(updateBasketCouponCodeSuccess(response));
  } catch (error) {
    yield put(updateBasketTimeWantedFailure(error));
  }
}

export function* checkoutSaga() {
  yield takeEvery(
    basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR,
    asyncgetSingleRestaurantCalendarRequest
  );
  yield takeEvery(
    basketActionsTypes.UPDATE_BASKET_TIME_WANTED,
    asyncUpdateBasketTimeWanted
  );
  yield takeEvery(
    basketActionsTypes.DELETE_BASKET_TIME_WANTED,
    asyncDeleteBasketTimeWanted
  );
  yield takeEvery(
    basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT,
    asyncUpdateBasketTipAmount
  );
  yield takeEvery(
    basketActionsTypes.UPDATE_BASKET_COUPON_CODE,
    asyncUpdateBasketCouponCode
  );
}
