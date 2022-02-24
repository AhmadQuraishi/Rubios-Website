import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { tokenActionsTypes as Type } from '../../types/token';
import { getToken } from '../../../services/token';
import {
  getTokenRequestFailure,
  getTokenRequestSuccess,
} from '../../actions/token';

function* asyncTokenRequest(action: any): any {
  try {
    const response = yield call(getToken, action.code);
    yield put(getTokenRequestSuccess(response.data));
  } catch (error) {
    yield put(getTokenRequestFailure(error));
  }
}

export function* storeToken() {
  yield takeEvery(Type.GET_TOKEN_REQUEST, asyncTokenRequest);
}
