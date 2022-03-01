import { displayToast } from '../../../helpers/toast';
import { checkinTypes as Type } from '../../types/check-in';

export function createCheckIn(data: any) {
  return {
    type: Type.CREATE_CHECK_IN,
    payload: data
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
  displayToast("ERROR", "Rewards not added");
  return {
    type: Type.CHECK_IN_FAILURE,
    error: error,
  };
}


