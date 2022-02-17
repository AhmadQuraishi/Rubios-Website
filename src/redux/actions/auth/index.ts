import { authActionsTypes as Type } from '../../types/auth';


export function getAuthRequest() {
  return {
    type: Type.GET_AUTHTOKEN_REQUEST,
  };
}

export function getAuthRequestSuccess(data: any) {
  return {
    type: Type.GET_AUTHTOKEN_SUCCESS,
    payload: data,
  };
}

export function getAuthRequestFailure(error: any) {
  return {
    type: Type.GET_AUTHTOKEN_FAILURE,
    error: error,
  };
}
