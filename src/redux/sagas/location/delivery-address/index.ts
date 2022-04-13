import { takeEvery, put } from 'redux-saga/effects';
import { deliveryAddressTypes as Type } from '../../../types/location/delivery-address';

import {
  setDeliveryAddressSuccess,
  setDeliveryAddressFailure,
} from '../../../actions/location/delivery-address';

function* setDeliveryAddressHandler(action: any): any {
  try {
    yield put(setDeliveryAddressSuccess(action.data));
  } catch (error) {
    yield put(setDeliveryAddressFailure(error));
  }
}

export function* deliveryAddressSaga() {
  yield takeEvery(Type.SET_DELIVERY_ADDRESS, setDeliveryAddressHandler);
}
