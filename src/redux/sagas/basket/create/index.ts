import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  setBasketRequestSuccess,
  setBasketRequestFailure,
  createBasketFromPrevSuccess,
  createBasketFromPrevFailure,
} from '../../../actions/basket/create';
import { getDummyBasket, requestCreateBasket } from '../../../../services/basket';

function* asyncCreateBasketRequest(action: any): any {
  try {
    const response = yield call(getDummyBasket, action.request);
    yield put(setBasketRequestSuccess(response));
  } catch (error) {
    yield put(setBasketRequestFailure(error));
  }
}

function* createBasketFromPrevHandler(action: any): any {
  try {
    const response = yield call(requestCreateBasket, action.body);
    yield put(createBasketFromPrevSuccess(response));
  } catch (error) {
    yield put(createBasketFromPrevFailure(error));
  }
}

export function* createBasketSaga() {
  yield takeEvery(
    basketActionsTypes.SET_BASKET_REQUEST,
    asyncCreateBasketRequest,
  );
  yield takeEvery(
    basketActionsTypes.CREATE_BASKET_FROM_PREV,
    createBasketFromPrevHandler,
  );
}
