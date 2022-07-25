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

function* asyncNearbyResturantListRequest(action: any): any {
  try {
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
  } catch (error) {
    yield put(getNearByResturantListRequestFailure(error));
  }
}

function* asyncResturantListRequest(action: any): any {
  try {
    const response = yield call(getAllResturants);
    yield put(getResturantListRequestSuccess(response));
  } catch (error) {
    yield put(getResturantListRequestFailure(error));
  }
}

export function* resturantListSaga() {
  yield takeEvery(
    restaurantListDataActionsTypes.GET_RESTAURANT_LIST_REQUEST,
    asyncResturantListRequest,
  );
  yield takeEvery(
    restaurantListDataActionsTypes.GET_NEARBY_RESTAURANT_LIST_REQUEST,
    asyncNearbyResturantListRequest,
  );
}
