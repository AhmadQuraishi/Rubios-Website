import { takeEvery, put, call } from 'redux-saga/effects';
import { rewardTypes as Type } from '../../../types/reward';
import {
  getRewardsForCheckoutRequestSuccess,
  getRewardsForCheckoutRequestFailure,
} from '../../../actions/reward/checkout';
import { getRewardsByTokenAndVendorID } from '../../../../services/reward/checkout';

function* getRewardForCheckoutHandler(action: any): any {
  try {
    const response = yield call(
      getRewardsByTokenAndVendorID,
      action.vendorID,
      action.authToken,
    );
    yield put(getRewardsForCheckoutRequestSuccess(response));
  } catch (error) {
    yield put(getRewardsForCheckoutRequestFailure(error));
  }
}

export function* getRewardsForCheckoutSaga() {
  yield takeEvery(
    Type.GET_USER_REWARDS_FOR_CHECKOUT_REQUEST,
    getRewardForCheckoutHandler,
  );
}
