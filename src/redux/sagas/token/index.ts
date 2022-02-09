import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { tokenActionsTypes as Type } from '../../types/token';
import { getToken } from '../../../services/auth';
import {
  getTokenRequestFailure,
  getTokenRequestSuccess,
} from '../../actions/token';

function* asyncTokenItemRequest(action: any): any {
  try {
    debugger
    const response = yield call(getToken, action.code);
    yield put(getTokenRequestSuccess(response));
  } catch (error) {
    yield put(getTokenRequestFailure(error));
  }
}

export function* storeToken() { debugger
  yield takeEvery(Type.GET_TOKEN_REQUEST, asyncTokenItemRequest);
}
