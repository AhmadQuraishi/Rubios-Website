import { takeEvery, put, call } from 'redux-saga/effects';
import { providerActionsTypes as Type } from '../../types/provider';
import { getProviderToken } from '../../../services/provider';
import {
  getProviderRequestFailure,
  getProviderRequestSuccess,
} from '../../actions/provider';


function* asyncProviderItemRequest(): any {
    try {
      console.log("get user2")
      debugger
      const response = yield call(getProviderToken);
      yield put(getProviderRequestSuccess(response));
    } catch (error) {
      yield put(getProviderRequestFailure(error));
    }
  }
export function* storeProvider() { 
  yield takeEvery(Type.GET_PROVIDER_REQUEST, asyncProviderItemRequest);
}
