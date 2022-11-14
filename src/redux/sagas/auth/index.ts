import { takeEvery, put, call } from 'redux-saga/effects';
import { authActionsTypes } from '../../types/auth';
import { getAuthToken } from '../../../services/auth';
import {
  getAuthRequestFailure,
  getAuthRequestSuccess,
} from '../../actions/auth';
import { navigateAppAction } from '../../actions/navigate-app';

function* asyncAuthItemRequest(action: any): any {
  try {
    const response = yield call(getAuthToken, action.basketID);
    yield put(getAuthRequestSuccess(action.successMsg, response.data));
    if (
      action?.registerType &&
      (action.registerType === 'REGISTER_MAIN' ||
        action.registerType === 'REGISTER_CONFIRMATION')
    ) {
      yield put(navigateAppAction('/welcome?new_user=true'));
    }
  } catch (error) {
    yield put(getAuthRequestFailure(error));
  }
}
export function* storeAuth() {
  yield takeEvery(authActionsTypes.GET_AUTHTOKEN_REQUEST, asyncAuthItemRequest);
}
