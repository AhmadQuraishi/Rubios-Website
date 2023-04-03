import { takeEvery, put, call } from 'redux-saga/effects';
import { userTypes as Type } from '../../types/user';
import { authActionsTypes } from '../../types/auth';
import {
  RequestUserProfile,
  requestUserRecentOrders,
  requestUserDeliiveryAddresses,
  requestSetUserDefDelAddress,
  requestDelUserDelAddress,
  requestUpdateUser,
  requestChangePassword,
  requestUserBillingAccount,
  deleteUserBillingAccount,
  requestUserBillingAccountById,
  updateUserBillingAccount,
  requestUseGiftCards,
  requestDeleteFavOrder,
  requestUserFavoriteOrders,
  updateUserContactOptions,
  requestUserLogin,
  requestUserRegister,
  requestUpdateProfile,
  requestUserForgotPassword,
  resetPasswordRequest,
  requestFacebookUserLogin,
} from '../../../services/user';
import {
  deleteUserDelAddFailure,
  getUserDeliveryAddressesFailure,
  getUserDeliveryAddressesSuccess,
  getUserFavoritetOrdersFailure,
  getUserFavoritetOrdersSuccess,
  getUserprofileFailure,
  getUserprofileSuccess,
  getUserRecentOrdersFailure,
  getUserRecentOrdersSuccess,
  setUserDefaultDelAddFailure,
  setUserDefaultDelAddressSuccess,
  deleteUserDelAddSuccess,
  updateUserSuccess,
  updateUserFailure,
  changePasswordSuccess,
  changePasswordFailure,
  getAllBillingAccountsSuccess,
  getAllBillingAccountsFailure,
  deleteBillingAccountSuccess,
  deleteBillingAccountFailure,
  updateBillingAccountSuccess,
  updateBillingAccountFailure,
  getBillingAccountByIdSuccess,
  getBillingAccountByIdFailure,
  getAllGiftCardsSuccess,
  getAllGiftCardsFailure,
  deleteFavOrderSuccess,
  deleteFavOrderFailure,
  updateUserContactOptionsSuccess,
  updateUserContactOptionsFailure,
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userRegisterFailure,
  updateProfileSuccess,
  userForgotPasswordSuccess,
  userForgotPasswordFailure,
  userResetPasswordSuccess,
  userResetPasswordFailure,
} from '../../actions/user';
import { displayToast } from '../../../helpers/toast';
import { getProviderRequestSuccess } from '../../actions/provider';
import { navigateAppAction } from '../../actions/navigate-app';
import { basketActionsTypes } from '../../types/basket';
import { Navigate, useNavigate } from 'react-router-dom';
import { markOrderFav } from '../../../helpers/setRecentOrders';
import { resetBasketPaymentMethods } from '../../actions/basket';

const breakpoints = {
  XS: 540,
};

//profile
function* userProfileHandler(): any {
  try {
    const response = yield call(RequestUserProfile);
    yield put(getUserprofileSuccess(response));
    yield put(getProviderRequestSuccess(response));
  } catch (error) {
    yield put(getUserprofileFailure(error));
  }
}
//recent orders
function* userRecentOrdersHandler(action: any): any {
  try {
    const response = yield call(requestUserRecentOrders);
    yield put(getUserRecentOrdersSuccess(response));
  } catch (error) {
    yield put(getUserRecentOrdersFailure(error));
  }
}

////favorite orders
function* userFavoriteOrdersHandler(action: any): any {
  try {
    const response = yield call(requestUserFavoriteOrders);
    yield put(getUserFavoritetOrdersSuccess(response));
  } catch (error) {
    yield put(getUserFavoritetOrdersFailure(error));
  }
}

function* deleleteFavOrderHandler(action: any): any {
  try {
    const response = yield call(requestDeleteFavOrder, action.favid);
    const favOrders = yield call(requestUserFavoriteOrders);
    yield put(getUserFavoritetOrdersSuccess(favOrders));
    yield put(deleteFavOrderSuccess());
    markOrderFav('', action.favid, false);
  } catch (error) {
    yield put(deleteFavOrderFailure(error));
  }
}

//delivery address
function* userDeliveryAddressesHandler(action: any): any {
  try {
    const response = yield call(requestUserDeliiveryAddresses);
    yield put(getUserDeliveryAddressesSuccess(response));
  } catch (error) {
    yield put(getUserDeliveryAddressesFailure(error));
  }
}

//// set user default delivery address
function* userDefaultDelAddressHandler(action: any): any {
  try {
    const response = yield call(requestSetUserDefDelAddress, action.payload);
    yield put(setUserDefaultDelAddressSuccess(response));
  } catch (error) {
    yield put(setUserDefaultDelAddFailure(error));
  }
}

// delete delivery address
function* deleleteDelAddressHandler(action: any): any {
  try {
    const response = yield call(requestDelUserDelAddress, action.addressid);
    yield put(deleteUserDelAddSuccess());
  } catch (error) {
    yield put(deleteUserDelAddFailure(error));
  }
}

// Update User
function* updateUserHandler(action: any): any {
  try {
    if (action.profileCheck) {
      const response = yield call(requestUpdateProfile, action.payload);
      yield put(updateProfileSuccess(response));
      displayToast('SUCCESS', 'profile updated successfully');
    } else {
      const response = yield call(requestUpdateUser, action.payload);
      yield put(updateUserSuccess(response));
      yield put(getProviderRequestSuccess(response));
    }
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

// Update User
function* changePasswordHandler(action: any): any {
  try {
    const response = yield call(requestChangePassword, action.payload);
    yield put(changePasswordSuccess(response));
    displayToast('SUCCESS', 'password updated successfully');
  } catch (error) {
    yield put(changePasswordFailure(error));
    displayToast('ERROR', 'Password need to be new and unused');
  }
}

// Reset Password User
function* userResetPasswordHandler(action: any): any {
  try {
    console.log('reset_password_token 1', action.reset_password_token);
    const response = yield call(
      resetPasswordRequest,
      action.data,
      action.reset_password_token,
    );
    yield put(userResetPasswordSuccess(response));
    yield put(navigateAppAction(`/login`));
  } catch (error) {
    yield put(userResetPasswordFailure(error));
  }
}

// Get User BillingAccount Info
function* getUserBillingAccountHandler(action: any): any {
  try {
    const response = yield call(requestUserBillingAccount);
    yield put(getAllBillingAccountsSuccess(response));
  } catch (error) {
    yield put(getAllBillingAccountsFailure(error));
  }
}

// Delete User BillingAccount
function* deleteUserBillingAccountHandler(action: any): any {
  try {
    yield call(deleteUserBillingAccount, action.billingAccountId);
    yield put(deleteBillingAccountSuccess());
    yield put({ type: Type.GET_BILLING_ACCOUNTS });
  } catch (error) {
    yield put(deleteBillingAccountFailure(error));
  }
}

// Get User BillingAccount Info by id
function* getBillingAccountByIdHandler(action: any): any {
  try {
    const response = yield call(
      requestUserBillingAccountById,
      action.billingAccountId,
    );
    yield put(getBillingAccountByIdSuccess(response));
  } catch (error) {
    yield put(getBillingAccountByIdFailure(error));
  }
}

// Update User BillingAccount Info
function* updateUserBillingAccountHandler(action: any): any {
  try {
    const response = yield call(
      updateUserBillingAccount,
      action.payload,
      action.billingAccountId,
    );
    yield put(updateBillingAccountSuccess(response));
    yield put({ type: Type.GET_BILLING_ACCOUNTS });
  } catch (error) {
    yield put(updateBillingAccountFailure(error));
  }
}

// Get User GiftCards Info
function* getUserGiftCardsHandler(action: any): any {
  try {
    const response = yield call(requestUseGiftCards);
    yield put(getAllGiftCardsSuccess(response));
  } catch (error) {
    yield put(getAllGiftCardsFailure(error));
  }
}

// Update user contact options
function* updateUserContactOptionsHandler(action: any): any {
  try {
    const response = yield call(updateUserContactOptions, action.data);
    yield put(updateUserContactOptionsSuccess());
  } catch (error) {
    yield put(updateUserContactOptionsFailure(error));
  }
}

// User Login
function* userLoginHandler(action: any): any {
  try {
    const response = yield call(requestUserLogin, action.data);
    yield put(userLoginSuccess(response));
    if (action?.loginType === 'LOGIN_MAIN') {
      yield put(resetBasketPaymentMethods());
    }
    yield put({
      type: authActionsTypes.GET_AUTHTOKEN_REQUEST,
      successMsg: 'Login Success',
      basketID: action.basketID,
    });
  } catch (error) {
    yield put(userLoginFailure(error));
  }
}

// User Register
function* userRegisterHandler(action: any): any {
  try {
    const response = yield call(requestUserRegister, action.data);
    yield put(userRegisterSuccess(response));
    yield put({
      type: authActionsTypes.GET_AUTHTOKEN_REQUEST,
      successMsg: 'Signup Success',
      registerType: action.registerType,
      basketID: action.basketID,
    });
  } catch (error) {
    yield put(userRegisterFailure(error));
  }
}

function* facebookUserHandler(action: any): any {
  try {
    const response = yield call(requestFacebookUserLogin, action.data);
    yield put(userLoginSuccess(response));
    yield put({
      type: authActionsTypes.GET_AUTHTOKEN_REQUEST,
      successMsg: 'Login Success',
      basketID: action.basketID,
    });
  } catch (error) {
    yield put(userLoginFailure(error));
  }
}

// User Register
function* userForgotPasswordHandler(action: any): any {
  try {
    const response = yield call(requestUserForgotPassword, action.data);
    yield put(userForgotPasswordSuccess(response));
    yield put(navigateAppAction(`/login`));
  } catch (error) {
    yield put(userForgotPasswordFailure(error));
  }
}

export function* userSaga() {
  yield takeEvery(Type.GET_USER_PROFILE, userProfileHandler);
  yield takeEvery(Type.GET_USER_RECENT_ORDERS, userRecentOrdersHandler);
  yield takeEvery(Type.GET_USER_FAVORITE_ORDERS, userFavoriteOrdersHandler);
  yield takeEvery(
    Type.GET_USER_DELIVERY_ADDRESSES,
    userDeliveryAddressesHandler,
  );
  yield takeEvery(
    Type.SET_USER_DEFAULT_DELIVERY_ADDRESS,
    userDefaultDelAddressHandler,
  );
  yield takeEvery(Type.DELETE_USER_DELIVERY_ADDRESS, deleleteDelAddressHandler);
  yield takeEvery(Type.UPDATE_USER, updateUserHandler);
  yield takeEvery(Type.CHANGE_PASSWORD, changePasswordHandler);
  yield takeEvery(Type.GET_BILLING_ACCOUNTS, getUserBillingAccountHandler);
  yield takeEvery(Type.GET_BILLING_ACCOUNT_BY_ID, getBillingAccountByIdHandler);
  yield takeEvery(
    Type.DELETE_BILLING_ACCOUNTS,
    deleteUserBillingAccountHandler,
  );
  yield takeEvery(
    Type.UPDATE_BILLING_ACCOUNTS,
    updateUserBillingAccountHandler,
  );
  yield takeEvery(Type.GET_GIFT_CARDS, getUserGiftCardsHandler);
  yield takeEvery(Type.DELETE_FAV_ORDER, deleleteFavOrderHandler);
  yield takeEvery(
    Type.UPDATE_USER_CONTACT_OPTIONS,
    updateUserContactOptionsHandler,
  );
  yield takeEvery(Type.USER_LOGIN_REQUEST, userLoginHandler);
  yield takeEvery(Type.USER_REGISTER_REQUEST, userRegisterHandler);
  yield takeEvery(Type.USER_FACEBOOK_REQUEST, facebookUserHandler);
  yield takeEvery(Type.USER_FORGOT_PASSWORD_REQUEST, userForgotPasswordHandler);
  yield takeEvery(Type.USER_RESET_PASSWORD_REQUEST, userResetPasswordHandler);
}
