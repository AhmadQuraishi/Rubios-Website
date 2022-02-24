import { takeEvery, put, call } from 'redux-saga/effects';
import { authActionsTypes as Type } from '../../types/auth';
import { getAuthToken } from '../../../services/auth';
import {
  getAuthRequestFailure,
  getAuthRequestSuccess,
} from '../../actions/auth';


function* asyncAuthItemRequest(): any {
    try {
      const response = yield call(getAuthToken);
      yield put(getAuthRequestSuccess(response.data));
    } catch (error) {
      yield put(getAuthRequestFailure(error));
    }
  }
export function* storeAuth() { 
  yield takeEvery(Type.GET_AUTHTOKEN_REQUEST, asyncAuthItemRequest);
}
