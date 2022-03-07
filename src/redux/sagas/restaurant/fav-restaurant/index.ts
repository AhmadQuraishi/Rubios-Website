import { takeEvery, put, call } from 'redux-saga/effects';
import { getRestaurantInfo } from '../../../../services/restaurant';
import { getFavRestaurantFailure, getFavRestaurantSuccess } from '../../../actions/restaurant/fav-restaurant';
import { favRestaurantActionsTypes as Type } from "../../../types/restaurant/fav-restaurant";

function* favRestaurantHandler(action: any): any {
  try {
    const response = yield call(getRestaurantInfo, action.restaurantID);
    yield put(getFavRestaurantSuccess(response));
  } catch (error) {
    yield put(getFavRestaurantFailure(error));
  }
}

export function* favRestaurantSaga() {
  yield takeEvery(
    Type.GET_FAV_RESTAURANT,
    favRestaurantHandler,
  );
}
