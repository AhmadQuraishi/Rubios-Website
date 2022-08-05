import { takeEvery, put, call } from 'redux-saga/effects';
import { rewardTypes as Type } from '../../types/reward';
import {
  getRewardsFailure,
  getRewardsNewFailure,
  getRewardsNewSuccess,
  getRewardsSuccess,
} from '../../actions/reward';
import { requestRewards, requestRewardsNew } from '../../../services/reward';

function* redeemRewardHandler(): any {
  try {
    const response = yield call(requestRewards);
    yield put(getRewardsSuccess(response));
  } catch (error) {
    yield put(getRewardsFailure(error));
  }
}

function* getRewardNewHandler(): any {
  try {
    const response = yield call(requestRewardsNew);
    yield put(getRewardsNewSuccess(response));
  } catch (error) {
    yield put(getRewardsNewFailure(error));
  }
}

export function* redeemRewardSada() {
  yield takeEvery(Type.GET_REWARDS, redeemRewardHandler);
  yield takeEvery(Type.GET_REWARDS_NEW, getRewardNewHandler);
}
