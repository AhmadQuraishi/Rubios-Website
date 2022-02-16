import { takeEvery, put, call } from 'redux-saga/effects';
import { restaurantActionsTypes } from '../../types/restaurant';
import { getRestaurantInfo } from '../../../services/restaurant';
import {
  getResturantInfoRequestSuccess,
  getResturantInfoRequestFailure,
} from '../../actions/restaurant';

function* asyncResturantInfoRequest(action: any): any {
  try {
    const response = yield call(getRestaurantInfo, action.restaurantID);
    yield put(getResturantInfoRequestSuccess(response));
  } catch (error) {
    yield put(getResturantInfoRequestFailure(error));
  }
}

export function* restaurantInfoSaga() {
  yield takeEvery(
    restaurantActionsTypes.GET_RESTAURANT_INFO_REQUEST,
    asyncResturantInfoRequest,
  );
}
