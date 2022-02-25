import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  getDummyBasketRequestSuccess,
  getDummyBasketRequestFailure,
} from '../../../actions/basket/dummy';
import { getDummyBasket } from '../../../../services/basket';

function* asyncDummyBasketRequest(action: any): any {
  try {
    const response = yield call(getDummyBasket, action.request);
    yield put(getDummyBasketRequestSuccess(response));
  } catch (error) {
    yield put(getDummyBasketRequestFailure(error));
  }
}

export function* dummyBasketSaga() {
  yield takeEvery(
    basketActionsTypes.GET_DUMMY_BASKET_REQUEST,
    asyncDummyBasketRequest,
  );
}
