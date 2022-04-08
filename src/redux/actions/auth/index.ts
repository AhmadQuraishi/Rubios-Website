import { displayToast } from '../../../helpers/toast';
import { authActionsTypes as Type } from '../../types/auth';

export function getAuthRequest(basketID: string = '') {
  return {
    type: Type.GET_AUTHTOKEN_REQUEST,
    basketID,
  };
}

export function getAuthRequestSuccess(successMsg: string, data: any) {
  displayToast('SUCCESS', successMsg);
  return {
    type: Type.GET_AUTHTOKEN_SUCCESS,
    payload: data,
  };
}

export function getAuthRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.GET_AUTHTOKEN_FAILURE,
    error: error,
  };
}
