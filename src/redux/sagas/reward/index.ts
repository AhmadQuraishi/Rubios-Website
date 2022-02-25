import { takeEvery, put, call } from 'redux-saga/effects';
import { rewardTypes as Type } from '../../types/reward';
import {getRedeemRewardsFailure, getRedeemRewardsSuccess} from '../../actions/reward'
import {RequestRedeemRewards} from '../../../services/reward'


function* redeemRewardHandler(): any {
    try {
      const response = yield call(RequestRedeemRewards); 
      yield put(getRedeemRewardsSuccess(response));
    } catch (error) {
      yield put(getRedeemRewardsFailure(error));
    }
  }


export function* redeemRewardSada() {
    yield takeEvery(Type.GET_REDEEM_REWARDS, redeemRewardHandler);
}
