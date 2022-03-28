import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../types/basket';
import {
  getBasketRequestSuccess,
  getBasketRequestFailure,
} from '../../actions/basket';
import { getBasket } from '../../../services/basket';

function* asyncGetBasketRequest(action: any): any {
  try {
    if (action.basketid == '') {
      yield put(
        getBasketRequestSuccess(action.updatedBasket, action.basketType),
      );
    } else {
      const response = yield call(getBasket, action.basketid);
      yield put(getBasketRequestSuccess(response));
    }
  } catch (error) {
    yield put(getBasketRequestFailure(error));
  }
}

export function* BasketSaga() {
  yield takeEvery(basketActionsTypes.GET_BASKET_REQUEST, asyncGetBasketRequest);
}
