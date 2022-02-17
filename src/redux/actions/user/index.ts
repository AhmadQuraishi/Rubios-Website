import { userTypes as Type } from '../../types/user';
import {
  ResponseRecentOrders,
  ResponseUserDeliveryAddresses,
  ResponseUserFaves,
} from '../../../types/olo-api';

//profile actions
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

// recent order actions

export function getUserRecentOrders(authtoken: string) {
  return {
    type: Type.GET_USER_RECENT_ORDERS,
    authtoken: authtoken,
  };
}

export function getUserRecentOrdersSuccess(data: ResponseRecentOrders) {
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

// favorite order actions

export function getUserFavoritetOrders(authtoken: string) {
  return {
    type: Type.GET_USER_FAVORITE_ORDERS,
    authtoken: authtoken,
  };
}

export function getUserFavoritetOrdersSuccess(data: ResponseUserFaves) {
  return {
    type: Type.GET_USER_FAVORITE_ORDERS_SUCCESS,
    payload: data,
  };
}

export function getUserFavoritetOrdersFailure(error: any) {
  return {
    type: Type.GET_USER_FAVORITE_ORDERS_FAILURE,
    error: error,
  };
}

// delivery address actions

export function getUserDeliveryAddresses(authtoken: string) {
  return {
    type: Type.GET_USER_DELIVERY_ADDRESSES,
    authtoken: authtoken,
  };
}

export function getUserDeliveryAddressesSuccess(data: ResponseUserDeliveryAddresses) {
  return {
    type: Type.GET_USER_DELIVERY_ADDRESSES_SUCCESS,
    payload: data,
  };
}

export function getUserDeliveryAddressesFailure(error: any) {
  return {
    type: Type.GET_USER_DELIVERY_ADDRESSES_FAILURE,
    error: error,
  };
}

//set User default delivery address , Setting only , No retrieval

export function setUserDefaultDelAddress(data: RequestUserDefaultAddress, authtoken: string) {
  return {
    type: Type.SET_USER_DEFAULT_DELIVERY_ADDRESS,
    payload: data,
    authtoken: authtoken,
  };
}
export function setUserDefaultDelAddressSuccess(data: ResponseUserDeliveryAddresses) {
  return {
    type: Type.SET_USER_DEF_DEL_ADD_SUCCESS,
    payload: data,

  };
}

export function setUserDefaultDelAddFailure(error: any) {
  return {
    type: Type.SET_USER_DEFAULT_DEL_ADD_FAILURE,
    error: error,
  };
}


//Delete user delivery address

export function deleteUserDeliveryAddress(addressid: number, authtoken: string) {
  return {
    type: Type.DELETE_USER_DELIVERY_ADDRESS,
    addressid: addressid,
    authtoken: authtoken,
  };
}

export function deleteUserDelAddSuccess() {
  return {
    type: Type.DEL_USER_DEL_ADD_SUCCESS,

  };
}

export function deleteUserDelAddFailure(error: any) {
  return {
    type: Type.DEL_USER_DEL_ADD_FAILURE,
    error: error,
  };
}


//Update user

export function updateUser(data: any) {
  return {
    type: Type.UPDATE_USER,
    payload: data
  };
}

export function updateUserSuccess(data: any) {
  return {
    type: Type.UPDATE_USER_SUCCESS,
    payload: data
  };
}

export function updateUserFailure(error: any) {
  return {
    type: Type.UPDATE_USER_FAILURE,
    error: error,
  };
}

//Change Password

export function changePassword(data: any) {
  return {
    type: Type.CHANGE_PASSWORD,
    payload: data
  };
}

export function changePasswordSuccess(data: any) {
  return {
    type: Type.CHANGE_PASSWORD_SUCCESS,
    payload: data
  };
}

export function changePasswordFailure(error: any) {
  return {
    type: Type.CHANGE_PASSWORD_FAILURE,
    error: error,
  };
}