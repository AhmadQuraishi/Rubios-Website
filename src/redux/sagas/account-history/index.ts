import { takeEvery, put, call } from 'redux-saga/effects';
import { requestAccountHistory } from '../../../services/account-history';
import { getAccountHistoryFailure, getAccountHistorySuccess } from '../../actions/account-history';
import { accountHistoryTypes as Type } from '../../types/account-hostory';


function* accountHistoryHandler(action: any): any {
  try {
    
    const response = yield call(requestAccountHistory ,action.event_filter);
    if (action.event_filter==="rewards"){
      const redemptionresponse = yield call(requestAccountHistory ,"redemptions");
      yield put(getAccountHistorySuccess([
        ...response,
        ...redemptionresponse
      ]));
    } else {
        yield put(getAccountHistorySuccess(response));
    }
   
  } catch (error) {
    yield put(getAccountHistoryFailure(error));
  }
}
export function* accountHistorySaga() {
  yield takeEvery(Type.GET_ACCOUNT_HISTORY, accountHistoryHandler);
}


