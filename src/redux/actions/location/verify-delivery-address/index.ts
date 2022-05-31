import { deliveryAddressTypes as Type } from '../../../types/location/delivery-address';
import { displayToast } from '../../../../helpers/toast';

export function verifyDeliveryAddressRequest(restaurantID: number, body: any) {
  return {
    type: Type.VERIFY_DELIVERY_ADDRESS_REQUEST,
    restaurantID,
    body,
  };
}

export function verifyDeliveryAddressRequestSuccess(data: any) {
  return {
    type: Type.VERIFY_DELIVERY_ADDRESS_REQUEST_SUCCESS,
    payload: data,
  };
}

export function verifyDeliveryAddressRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.VERIFY_DELIVERY_ADDRESS_REQUEST_FAILURE,
    error: error,
  };
}
