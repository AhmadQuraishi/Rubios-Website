import { deliveryAddressTypes as Type } from '../../../types/location/delivery-address';
import { displayToast } from '../../../../helpers/toast';

export function setDeliveryAddress(data: any) {
  return {
    type: Type.SET_DELIVERY_ADDRESS,
    data,
  };
}

export function setDeliveryAddressSuccess(data: any) {
  return {
    type: Type.SET_DELIVERY_ADDRESS_SUCCESS,
    payload: data,
  };
}

export function setDeliveryAddressFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.SET_DELIVERY_ADDRESS_FAILURE,
    error: error,
  };
}
