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
import { validateBasketSuccess } from '../../../../actions/basket/checkout';
import { validateBasket } from '../../../../../services/checkout';

function* removeRewardFromCheckoutHandler(action: any): any {
  try {
    const response = yield call(
      removeRewardsFromBasket,
      action.basketID,
      action.rewardID,
    );
    const validateResponse = yield call(validateBasket, action.basketID);
    yield put(validateBasketSuccess(validateResponse));
    const basketResponse = yield call(getBasket, action.basketID);
    yield put(getBasketRequestSuccess(basketResponse));
    yield put(removeRewardFromBasketRequestSuccess(response));
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
