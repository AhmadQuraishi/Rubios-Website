import { takeEvery, put, call } from 'redux-saga/effects';
import { rewardTypes as Type } from '../../types/reward';
import { getRewardsFailure, getRewardsSuccess } from '../../actions/reward'
import { requestRewards } from '../../../services/reward';

function* redeemRewardHandler(): any {
    try {
      const response = yield call(requestRewards); 
      yield put(getRewardsSuccess(response));
    } catch (error) {
      yield put(getRewardsFailure(error));
    }
  }


export function* redeemRewardSada() {
    yield takeEvery(Type.GET_REWARDS, redeemRewardHandler);
}
