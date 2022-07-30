import { userTypes as Type } from '../../types/user';
import {
  ResponseRecentOrders,
  ResponseUserDeliveryAddresses,
  ResponseUserFaves,
  ResponseUserBillingAccounts,
  ResponseContactOptions,
} from '../../../types/olo-api';
import { displayToast } from '../../../helpers/toast';

const breakpoints = {
  XS: 540
};

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

export function getUserRecentOrders() {
  return {
    type: Type.GET_USER_RECENT_ORDERS,
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

export function getUserFavoritetOrders() {
  return {
    type: Type.GET_USER_FAVORITE_ORDERS,
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

export function getUserDeliveryAddresses() {
  return {
    type: Type.GET_USER_DELIVERY_ADDRESSES,
  };
}

export function getUserDeliveryAddressesSuccess(
  data: ResponseUserDeliveryAddresses,
) {
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

export function setUserDefaultDelAddress(data: RequestUserDefaultAddress) {
  return {
    type: Type.SET_USER_DEFAULT_DELIVERY_ADDRESS,
    payload: data,
  };
}
export function setUserDefaultDelAddressSuccess(
  data: ResponseUserDeliveryAddresses,
) {
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

export function deleteUserDeliveryAddress(addressid: number) {
  return {
    type: Type.DELETE_USER_DELIVERY_ADDRESS,
    addressid: addressid,
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

export function updateUser(data: any, profileCheck: boolean) {
  return {
    type: Type.UPDATE_USER,
    payload: data,
    profileCheck: profileCheck,
  };
}

export function updateUserSuccess(data: any) {
  return {
    type: Type.UPDATE_USER_SUCCESS,
    payload: data,
  };
}

export function updateUserFailure(error: any) {
  displayToast(
    'ERROR',
    (error && error.current_password && error.current_password[0]) ||
      (error && error.phone && error.phone[0]) ||
      (error && error.email && error.email[0]) ||
      (error && error.password && error.password[0]) ||
      (error && 'profile not updated'),
  );
  return {
    type: Type.UPDATE_USER_FAILURE,
    error: error,
  };
}

export function updateProfileSuccess(data: any) {
  return {
    type: Type.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
}
//Change Password

export function changePassword(data: any) {
  return {
    type: Type.CHANGE_PASSWORD,
    payload: data,
  };
}

export function changePasswordSuccess(data: any) {
  return {
    type: Type.CHANGE_PASSWORD_SUCCESS,
    payload: data,
  };
}
export function changePasswordFailure(error: any) {
  return {
    type: Type.CHANGE_PASSWORD_FAILURE,
    payload: error,
  };
}

//  Get Billing Accounts

export function getAllBillingAccounts() {
  return {
    type: Type.GET_BILLING_ACCOUNTS,
  };
}

export function getAllBillingAccountsSuccess(
  data: ResponseUserBillingAccounts,
) {
  return {
    type: Type.GET_BILLING_ACCOUNTS_SUCCESS,
    payload: data,
  };
}

export function getAllBillingAccountsFailure(error: any) {
  return {
    type: Type.GET_BILLING_ACCOUNTS_FAILURE,
    error: error,
  };
}

//  Get Billing Account By Id

export function getBillingAccountById(billingAccountId: number) {
  return {
    type: Type.GET_BILLING_ACCOUNT_BY_ID,
    billingAccountId: billingAccountId,
  };
}

export function getBillingAccountByIdSuccess(
  data: ResponseUserBillingAccounts,
) {
  return {
    type: Type.GET_BILLING_ACCOUNT_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getBillingAccountByIdFailure(error: any) {
  return {
    type: Type.GET_BILLING_ACCOUNT_BY_ID_FAILURE,
    error: error,
  };
}

// Delete Billing Account

export function deleteBillingAccount(billingAccountId: number) {
  return {
    type: Type.DELETE_BILLING_ACCOUNTS,
    billingAccountId: billingAccountId,
  };
}

export function deleteBillingAccountSuccess() {
  return {
    type: Type.DELETE_BILLING_ACCOUNTS_SUCCESS,
  };
}

export function deleteBillingAccountFailure(error: any) {
  return {
    type: Type.DELETE_BILLING_ACCOUNTS_FAILURE,
    error: error,
  };
}

// update Billing Account

export function updateBillingAccount(
  data: RequestUserDefaultBillingAccount,
  billingAccountId: number,
) {
  return {
    type: Type.UPDATE_BILLING_ACCOUNTS,
    payload: data,
    billingAccountId: billingAccountId,
  };
}

export function updateBillingAccountSuccess(data: ResponseUserBillingAccounts) {
  return {
    type: Type.UPDATE_BILLING_ACCOUNTS_SUCCESS,
    payload: data,
  };
}

export function updateBillingAccountFailure(error: any) {
  return {
    type: Type.UPDATE_BILLING_ACCOUNTS_FAILURE,
    error: error,
  };
}

//  Get Gift Card

export function getAllGiftCards() {
  return {
    type: Type.GET_GIFT_CARDS,
  };
}

export function getAllGiftCardsSuccess(data: ResponseUserBillingAccounts) {
  return {
    type: Type.GET_GIFT_CARDS_SUCCESS,
    payload: data,
  };
}

export function getAllGiftCardsFailure(error: any) {
  return {
    type: Type.GET_GIFT_CARDS_FAILURE,
    error: error,
  };
}

//Delete Fav Order
//Delete user delivery address

export function deleteFavOrder(favid: number) {
  return {
    type: Type.DELETE_FAV_ORDER,
    favid: favid,
  };
}

export function deleteFavOrderSuccess() {
  return {
    type: Type.DEL_FAV_ORDER_SUCCESS,
  };
}

export function deleteFavOrderFailure(error: any) {
  return {
    type: Type.DEL_FAV_ORDER__FAILURE,
    error: error,
  };
}

export function updateUserContactOptions(data: ResponseContactOptions) {
  return {
    type: Type.UPDATE_USER_CONTACT_OPTIONS,
    data,
  };
}

export function updateUserContactOptionsSuccess() {
  return {
    type: Type.UPDATE_USER_CONTACT_OPTIONS_SUCCESS,
  };
}

export function updateUserContactOptionsFailure(error: any) {
  return {
    type: Type.UPDATE_USER_CONTACT_OPTIONS_FAILURE,
    error: error,
  };
}

export function userLogin(data: any, basketID: string = '') {
  return {
    type: Type.USER_LOGIN_REQUEST,
    data,
    basketID
  };
}

export function userLoginSuccess(data: any) {
  return {
    type: Type.USER_LOGIN_SUCCESS,
    payload: data,
  };
}

export function userLoginFailure(error: any) {
  displayToast(
    'ERROR',
    error?.data?.error ? error.data.error : 'ERROR! Please Try again later',
  );
  return {
    type: Type.USER_LOGIN_FAILURE,
    error: error,
  };
}

export function userRegister(data: any) {
  return {
    type: Type.USER_REGISTER_REQUEST,
    data,
  };
}

export function userRegisterSuccess(data: any) {
  return {
    type: Type.USER_REGISTER_SUCCESS,
    payload: data,
  };
}

export function userRegisterFailure(error: any) {
  if (error?.data?.errors?.base && error.data.errors.base.length) {
    error?.data?.errors.base.forEach((msg: string) => {
      displayToast('ERROR', msg);
    });
  } else {
    displayToast('ERROR', 'ERROR! Please Try again later');
  }
  if (error?.data?.errors?.email) {
    displayToast('ERROR', `Email ${error?.data?.errors?.email[0]}`);
  }
  if (error?.data?.errors?.phone) {
    displayToast('ERROR', `Phone ${error?.data?.errors?.phone[0]}`);
  }
  return {
    type: Type.USER_REGISTER_FAILURE,
    error: error,
  };
}

export function userForgotPasswordRequest(data: any) {
  return {
    type: Type.USER_FORGOT_PASSWORD_REQUEST,
    data,
  };
}

export function userForgotPasswordSuccess(response: any) {
  if(!breakpoints.XS){
  displayToast('SUCCESS', 'We have e-mailed your password reset link!');
  }
  // window.location.replace('/login');
  return {
    type: Type.USER_FORGOT_PASSWORD_SUCCESS,
  };
}

export function userForgotPasswordFailure(error: any) {
  displayToast(
    'ERROR',
    error?.data?.error ? error.data.error : 'ERROR! Please Try again later',
  );
  return {
    type: Type.USER_FORGOT_PASSWORD_FAILURE,
    error: error,
  };
}

export function userResetPasswordRequest(
  data: any,
  reset_password_token: string | null,
) {
  return {
    type: Type.USER_RESET_PASSWORD_REQUEST,
    data,
    reset_password_token,
  };
}

export function userResetPasswordSuccess(response: any) {
  if(!breakpoints.XS){
  displayToast('SUCCESS', 'password updated successfully');
  }
  // window.location.replace('/login');
  return {
    type: Type.USER_RESET_PASSWORD_SUCCESS,
  };
}

export function userResetPasswordFailure(error: any) {
  console.log('errr', error);
  if (error?.status === 401) {
    displayToast('ERROR', 'Reset code has been expired!');
  } else if (error?.status === 422) {
    displayToast('ERROR', 'Password need to be new and unused');
  } else {
    displayToast(
      'ERROR',
      error?.data?.error ? error.data.error : 'ERROR! Please Try again later',
    );
  }
  return {
    type: Type.USER_RESET_PASSWORD_FAILURE,
    error: error,
  };
}

export function userLogout() {
  return {
    type: Type.USER_LOGOUT,
  };
}

export function facebookUserLogin(data: any, basketID: string = '') {
  return {
    type: Type.USER_FACEBOOK_REQUEST,
    data,
    basketID
  };
}
