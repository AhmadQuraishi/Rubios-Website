import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../types/basket';
import {
  getBasketRequestSuccess,
  getBasketRequestFailure,
  getUserDeliveryAddressesForBasketSuccess,
  getUserDeliveryAddressesForBasketFailure,
} from '../../actions/basket';
import { getBasket } from '../../../services/basket';
import { requestUserDeliiveryAddresses } from '../../../services/user';

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

function* userDeliveryAddressesForBasketHandler(action: any): any {
  try {
    const response = yield call(requestUserDeliiveryAddresses);
    yield put(getUserDeliveryAddressesForBasketSuccess(response));
  } catch (error) {
    yield put(getUserDeliveryAddressesForBasketFailure(error));
  }
}

export function* BasketSaga() {
  yield takeEvery(basketActionsTypes.GET_BASKET_REQUEST, asyncGetBasketRequest);
  yield takeEvery(
    basketActionsTypes.GET_USER_DELIVERY_ADDRESSES_FOR_BASKET,
    userDeliveryAddressesForBasketHandler,
  );
}
