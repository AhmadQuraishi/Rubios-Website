import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { userTypes as Type } from '../../types/user';
import {
  RequestUserProfile,
  requestUserRecentOrders,
} from '../../../services/user';
import {
  getUserprofileFailure,
  getUserprofileSuccess,
  getUserRecentOrdersFailure,
  getUserRecentOrdersSuccess,
} from '../../actions/user';

function* userProfileHandler(): any {
  try {
    const response = yield call(RequestUserProfile);
    yield put(getUserprofileSuccess(response));
  } catch (error) {
    yield put(getUserprofileFailure(error));
  }
}
function* userRecentOrdersHandler(action: any): any {
  try {
    const response = yield call(requestUserRecentOrders, action.authtoken);
    yield put(getUserRecentOrdersSuccess(response));
  } catch (error) {
    yield put(getUserRecentOrdersFailure(error));
  }
}

export function* userSaga() {
  yield takeEvery(Type.GET_USER_PROFILE, userProfileHandler);
  yield takeEvery(Type.GET_USER_RECENT_ORDERS, userRecentOrdersHandler);
}
