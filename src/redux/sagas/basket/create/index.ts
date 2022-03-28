import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  setBasketRequestSuccess,
  setBasketRequestFailure,
  createBasketFromPrevSuccess,
  createBasketFromPrevFailure,
  createBasketFromPrevOrderSuccess,
  createBasketFromPrevOrderFailure,
  createBasketFromFavOrderSuccess,
  createBasketFromFavOrderFailure,
  setBasketDeliveryModeSuccess,
  setBasketDeliveryModeFailure
} from '../../../actions/basket/create';
import {
  getDummyBasket,
  requestCreateBasket,
  requestCreateBasketForFav,
  setBasketDeliveryMode
} from '../../../../services/basket';

function* asyncCreateBasketRequest(action: any): any {
  try {
    const response = yield call(getDummyBasket, action.request);
    action.basketid = response.id;
    console.log('responsessss', response)
    yield put({type: basketActionsTypes.SET_BASKET_DELIVERY_MODE_REQUEST, action});
    yield put(setBasketRequestSuccess(response));
  } catch (error) {
    yield put(setBasketRequestFailure(error));
  }
}

function* asyncSetBasketDeliveryModeRequest(action: any): any {
  try {
    const payload = {
      deliverymode: action.action.deliverymode
    }
    const response = yield call(setBasketDeliveryMode, action.action.basketid, payload);
    yield put(setBasketDeliveryModeSuccess(response));
  } catch (error) {
    yield put(setBasketDeliveryModeFailure(error));
  }
}

function* asyncCreateBasketFormPrevRequest(action: any): any {
  try {
    const response = yield call(requestCreateBasket, action.body);
    yield put(createBasketFromPrevOrderSuccess(response));
  } catch (error) {
    yield put(createBasketFromPrevOrderFailure(error));
  }
}

function* asyncCreateBasketFromFavRequest(action: any): any {
  try {
    const response = yield call(requestCreateBasketForFav, action.body);
    yield put(createBasketFromFavOrderSuccess(response));
  } catch (error) {
    yield put(createBasketFromFavOrderFailure(error));
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
  yield takeEvery(
    basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_REQUEST,
    asyncCreateBasketFormPrevRequest,
  );
  yield takeEvery(
    basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_REQUEST,
    asyncCreateBasketFromFavRequest,
  );
  yield takeEvery(
    basketActionsTypes.SET_BASKET_DELIVERY_MODE_REQUEST,
    asyncSetBasketDeliveryModeRequest,
  );
}
