import { takeEvery, put, call } from 'redux-saga/effects';
import {
  requestRedeemableRedemptionCode,
  requestRewardRedemptionCode,
} from '../../../../services/reward/redemption';
import {
  getRewardRedemptionCodeSuccess,
  getRewardRedemptionCodeFailure,
  getRedeemableRedemptionCodeSuccess,
  getRedeemableRedemptionCodeFailure,
} from '../../../actions/reward/redemption';
import { redemptionTypes as Type } from '../../../types/reward/redemption';

function* rewardRedemptionHandler(action: any): any {
  try {
    const response = yield call(requestRewardRedemptionCode, action.payload);
    yield put(getRewardRedemptionCodeSuccess(response));
  } catch (error) {
    yield put(getRewardRedemptionCodeFailure(error));
  }
}

function* redeemableRedemptionHandler(action: any): any {
  try {
    const response = yield call(
      requestRedeemableRedemptionCode,
      action.payload,
    );
    yield put(getRedeemableRedemptionCodeSuccess(response));
  } catch (error) {
    yield put(getRedeemableRedemptionCodeFailure(error));
  }
}

export function* redemptionSaga() {
  yield takeEvery(Type.GET_REWARD_REDEMPTION_CODE, rewardRedemptionHandler);
  yield takeEvery(
    Type.GET_REDEEMABLE_REDEMPTION_CODE,
    redeemableRedemptionHandler,
  );
}
