import { takeEvery, put, call } from 'redux-saga/effects';
import { rewardTypes as Type } from '../../../../types/reward';
import {
  applyRewardOnBasketRequestSuccess,
  applyRewardOnBasketRequestFailure, applyRewardOnBasketFailureStopLoader,
} from '../../../../actions/reward/checkout/apply';
import { applyRewardsByTokenAndVendorID } from '../../../../../services/reward/checkout/apply';
import { validateBasket } from '../../../../../services/checkout';
import { getBasket } from '../../../../../services/basket';
import { validateBasketSuccess } from '../../../../actions/basket/checkout';
import {
  getBasketRequestFailure,
  getBasketRequestSuccess,
} from '../../../../actions/basket';
import { removeRewardsFromBasket } from '../../../../../services/reward/checkout/remove';
import { removeRewardFromBasketRequestSuccess } from '../../../../actions/reward/checkout/remove';

function* applyRewardForCheckoutHandler(action: any): any {
  try {
    let basketResponse = yield call(getBasket, action.basketID);
    if (basketResponse && basketResponse.appliedrewards.length > 0) {
      const response = yield call(
        removeRewardsFromBasket,
        action.basketID,
        basketResponse?.appliedrewards[0].rewardid,
      );
      yield put(removeRewardFromBasketRequestSuccess(response));
    }
    const response = yield call(
      applyRewardsByTokenAndVendorID,
      action.basketID,
      action.body,
    );
    const validateResponse = yield call(validateBasket, action.basketID);
    yield put(validateBasketSuccess(validateResponse));
    basketResponse = yield call(getBasket, action.basketID);
    yield put(getBasketRequestSuccess(basketResponse));
    yield put(applyRewardOnBasketRequestSuccess(response));
  } catch (error) {
    yield put(applyRewardOnBasketRequestFailure(error));
    try {
      let basketResponse = yield call(getBasket, action.basketID);
      if (basketResponse && basketResponse.appliedrewards.length > 0) {
        const response = yield call(
          removeRewardsFromBasket,
          action.basketID,
          basketResponse?.appliedrewards[0].rewardid,
        );
        yield put(removeRewardFromBasketRequestSuccess(response));
        const validateResponse = yield call(validateBasket, action.basketID);
        yield put(validateBasketSuccess(validateResponse));
        basketResponse = yield call(getBasket, action.basketID);
        yield put(getBasketRequestSuccess(basketResponse));
      }
      yield put(applyRewardOnBasketFailureStopLoader());
    } catch (error) {
      yield put(getBasketRequestFailure(error));
      yield put(applyRewardOnBasketFailureStopLoader());
    }
  }
}

export function* applyRewardsForCheckoutSaga() {
  yield takeEvery(
    Type.APPLY_REWARD_TO_BASKET_REQUEST,
    applyRewardForCheckoutHandler,
  );
}
