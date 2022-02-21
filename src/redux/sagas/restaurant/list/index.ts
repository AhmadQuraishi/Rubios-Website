import { takeEvery, put, call } from 'redux-saga/effects';
import { restaurantListDataActionsTypes } from '../../../types/restaurant/list';
import {
  getNearByRestaurants,
  getAllResturants,
} from '../../../../services/location';
import {
  getNearByResturantListRequestSuccess,
  getNearByResturantListRequestFailure,
  getResturantListRequestSuccess,
  getResturantListRequestFailure,
} from '../../../actions/restaurant/list';
import { ResponseRestaurantList } from '../../../../types/olo-api';

function* asyncResturantListRequest(action: any): any {
  try {
    if (action.lat) {
      const response = yield call(
        getNearByRestaurants,
        action.lat,
        action.long,
        action.radius,
        action.limit,
        action.startDate,
        action.endDate,
      );

      yield put(getNearByResturantListRequestSuccess(response));
    } else {
      const response = yield call(getAllResturants);
      yield put(getResturantListRequestSuccess(response));
    }
  } catch (error) {
    if (action.lat) {
      yield put(getNearByResturantListRequestFailure(error));
    } else {
      yield put(getResturantListRequestFailure(error));
    }
  }
}

export function* resturantListSaga() {
  yield takeEvery(
    restaurantListDataActionsTypes.GET_RESTAURANT_LIST_REQUEST,
    asyncResturantListRequest,
  );
}
