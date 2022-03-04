import { takeEvery, put, call } from 'redux-saga/effects';
import { requestSingleRestaurant } from '../../../../services/restaurant/fav-restaurant';
import { getSingleRestaurantFailure, getSingleRestaurantSuccess } from '../../../actions/restaurant/fav-restaurant';
import { favRestaurantActionsTypes as Type } from '../../../types/restaurant/fav-restaurant';


function* singleRestaurantHandler(action: any): any {
  try {
    const response = yield call(requestSingleRestaurant , action.payload); 
    yield put(getSingleRestaurantSuccess(response));
  } catch (error) {
    yield put(getSingleRestaurantFailure(error));
  }
}
export function* checkinSaga() {
  yield takeEvery(Type.GET_SINGLE_RESTAURANT, singleRestaurantHandler);
}
