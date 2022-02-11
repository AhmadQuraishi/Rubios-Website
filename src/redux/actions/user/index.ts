import { userTypes as Type } from '../../types/user';

export function getUserprofile() {
  return {
    type: Type.GET_USER_PROFILE,
  };
}

export function getUserprofileSuccess(data: any) {
  return {
    type: Type.GET_USER_PROFILE_SUCCESS,
    payload: data,
  };
}

export function getUserprofileFailure(error: any) {
  return {
    type: Type.GET_USER_PROFILE_FAILURE,
    error: error,
  };
}

export function getUserRecentOrders(authtoken: string) {
  return {
    type: Type.GET_USER_RECENT_ORDERS,
    authtoken: authtoken,
  };
}

export function getUserRecentOrdersSuccess(data: any) {
  return {
    type: Type.GET_USER_RECENT_ORDERS_SUCCESS,
    payload: data,
  };
}

export function getUserRecentOrdersFailure(error: any) {
  return {
    type: Type.GET_USER_RECENT_ORDERS_FAILURE,
    error: error,
  };
}
