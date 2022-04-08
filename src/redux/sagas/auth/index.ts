import { takeEvery, put, call } from 'redux-saga/effects';
import { authActionsTypes } from '../../types/auth';
import { getAuthToken } from '../../../services/auth';
import {
  getAuthRequestFailure,
  getAuthRequestSuccess,
} from '../../actions/auth';


function* asyncAuthItemRequest(action: any): any {
    try {
      const response = yield call(getAuthToken, action.basketID);
      yield put(getAuthRequestSuccess(action.successMsg, response.data));
    } catch (error) {
      yield put(getAuthRequestFailure(error));
    }
  }
export function* storeAuth() { 
  yield takeEvery(authActionsTypes.GET_AUTHTOKEN_REQUEST, asyncAuthItemRequest);
}
