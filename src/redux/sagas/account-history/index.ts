import { takeEvery, put, call } from 'redux-saga/effects';
import { requestAccountHistory } from '../../../services/account-history';
import { getAccountHistoryFailure, getAccountHistorySuccess } from '../../actions/account-history';
import { accountHistoryTypes as Type } from '../../types/account-hostory';


function* accountHistoryHandler(): any {
  try {
    const response = yield call(requestAccountHistory ); 
    yield put(getAccountHistorySuccess(response));
  } catch (error) {
    yield put(getAccountHistoryFailure(error));
  }
}
export function* accountHistorySaga() {
  yield takeEvery(Type.GET_ACCOUNT_HISTORY, accountHistoryHandler);
}


