import { takeEvery, put, call } from 'redux-saga/effects';
import { deliveryAddressTypes as Type } from '../../../types/location/delivery-address';

import {
  verifyDeliveryAddressRequestFailure,
  verifyDeliveryAddressRequestSuccess,
} from '../../../actions/location/verify-delivery-address';
import { requestToVerifyDeliveryAddress } from '../../../../services/verify-delivery-address';

function* verifyDeliveryAddressHandler(action: any): any {
  try {
    const response = yield call(
      requestToVerifyDeliveryAddress,
      action.restaurantID,
      action.body,
    );
    yield put(verifyDeliveryAddressRequestSuccess(response));
  } catch (error) {
    yield put(verifyDeliveryAddressRequestFailure(error));
  }
}

export function* verifyDeliveryAddressSaga() {
  yield takeEvery(Type.VERIFY_DELIVERY_ADDRESS_REQUEST, verifyDeliveryAddressHandler);
}
