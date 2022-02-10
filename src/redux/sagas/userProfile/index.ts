import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { userProfileTypes as Type } from '../../types/userProfile';
import { RequestUserProfile } from '../../../services/userProfile';
import {
  getUserprofileFailure,
  getUserprofileSuccess,
} from '../../actions/userProfile';

function* userProfileHandler(): any {
  try {
    const response = yield call(RequestUserProfile);
    yield put(getUserprofileSuccess(response));
  } catch (error) {
    yield put(getUserprofileFailure(error));
  }
}

export function* userProfileSaga() {
  yield takeEvery(Type.GET_USER_PROFILE, userProfileHandler);
}
