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
} from '../../../actions/basket/create';
import {
  getDummyBasket,
  requestCreateBasket,
  requestCreateBasketForFav,
  setBasketDeliveryAddress,
  setBasketDeliveryMode,
} from '../../../../services/basket';
import {
  setBasketDeliveryAddressSuccess,
  setBasketDeliveryModeSuccess,
} from '../../../actions/basket/checkout';

function* asyncCreateBasketRequest(action: any): any {
  try {
    let response = yield call(getDummyBasket, action.payload.request);
    action.payload.basketId = response.id;
    if (action.payload.deliveryAddress) {
      const deliveryAddressResponse = yield call(
        setBasketDeliveryAddress,
        action.payload.basketId,
        action.payload.deliveryAddress,
      );
      response = deliveryAddressResponse;
    }
    if (action.payload.deliverymode && !action.payload.deliveryAddress) {
      const deliveryModeResponse = yield call(
        setBasketDeliveryMode,
        action.payload.basketId,
        action.payload.deliverymode,
      );
      response = deliveryModeResponse;
    }
    yield put(setBasketRequestSuccess(response));
  } catch (error) {
    yield put(setBasketRequestFailure(error));
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
}
