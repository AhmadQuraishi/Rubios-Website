import { displayToast } from '../../../helpers/toast';
import { checkinTypes as Type } from '../../types/check-in';

export function createCheckIn(barcode: string) {
  return {
    type: Type.CREATE_CHECK_IN,
    payload: barcode
  };
}

export function checkInSuccess(data: any) {
  displayToast("SUCCESS", "Rewards have been added");
  return {
    type: Type.CHECK_IN_SUCCESS,
    payload: data,
  };
 
}

export function checkInFailure(error: any) {
  displayToast("ERROR", error?.response?.data?.errors?.base[0]? error.response.data.errors.base[0] : "Rewards not added");
  return {
    type: Type.CHECK_IN_FAILURE,
    error: error,
  };
}


