import { takeEvery, put, call } from 'redux-saga/effects';
import { requestRedemptionCode } from '../../../../services/reward/redemption';
import { getRedemptionCodeFailure, getRedemptionCodeSuccess } from '../../../actions/reward/redemption';
import { redemptionTypes as Type } from '../../../types/reward/redemption';

function* redemptionHandler(action: any): any {
  try {
    const response = yield call(requestRedemptionCode , action.payload); 
    yield put(getRedemptionCodeSuccess(response));
  } catch (error) {
    yield put(getRedemptionCodeFailure(error));
  }
}
export function* redemptionSaga() {
  yield takeEvery(Type.GET_CODE, redemptionHandler);
}


