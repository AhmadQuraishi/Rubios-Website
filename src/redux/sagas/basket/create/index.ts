import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  setBasketRequestSuccess,
  setBasketRequestFailure,
} from '../../../actions/basket/create';
import { getDummyBasket } from '../../../../services/basket';

function* asyncCreateBasketRequest(action: any): any {
  try {
    const response = yield call(getDummyBasket, action.request);
    yield put(setBasketRequestSuccess(response));
  } catch (error) {
    yield put(setBasketRequestFailure(error));
  }
}

export function* createBasketSaga() {
  yield takeEvery(
    basketActionsTypes.SET_BASKET_REQUEST,
    asyncCreateBasketRequest,
  );
}
