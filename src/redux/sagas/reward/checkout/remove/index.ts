import { takeEvery, put, call } from 'redux-saga/effects';
import { rewardTypes as Type } from '../../../../types/reward';
import {
  removeRewardFromBasketRequestSuccess,
  removeRewardFromBasketRequestFailure,
} from '../../../../actions/reward/checkout/remove';
import { removeRewardsFromBasket } from '../../../../../services/reward/checkout/remove';
import {
  getBasketRequest,
  getBasketRequestSuccess,
} from '../../../../actions/basket';
import { getBasket } from '../../../../../services/basket';

function* removeRewardFromCheckoutHandler(action: any): any {
  try {
    const response = yield call(
      removeRewardsFromBasket,
      action.basketID,
      action.rewardID,
    );
    yield put(removeRewardFromBasketRequestSuccess(response));
    const basketResponse = yield call(getBasket, action.basketID);
    yield put(getBasketRequestSuccess(basketResponse));
  } catch (error) {
    yield put(removeRewardFromBasketRequestFailure(error));
  }
}

export function* removeRewardFromBasketSaga() {
  yield takeEvery(
    Type.DELETE_REWARD_FROM_BASKET_REQUEST,
    removeRewardFromCheckoutHandler,
  );
}
