import { takeEvery, put, call } from 'redux-saga/effects';
import { rewardTypes as Type } from '../../types/reward';
import {
  getRewardsFailure, getRewardsLockedFailure, getRewardsLockedSuccess,
  getRewardsNewFailure,
  getRewardsNewSuccess,
  getRewardsSuccess,
} from '../../actions/reward';
import {requestRewards, requestRewardsLocked, requestRewardsNew} from '../../../services/reward';

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

function* getRewardLockedHandler(): any {
  try {
    const response = yield call(requestRewardsLocked);
    yield put(getRewardsLockedSuccess(response));
  } catch (error) {
    yield put(getRewardsLockedFailure(error));
  }
}

export function* redeemRewardSada() {
  yield takeEvery(Type.GET_REWARDS, redeemRewardHandler);
  yield takeEvery(Type.GET_REWARDS_NEW, getRewardNewHandler);
  yield takeEvery(Type.GET_REWARDS_LOCKED, getRewardLockedHandler);
}
