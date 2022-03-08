import { takeEvery, put, call } from 'redux-saga/effects';
import { userTypes as Type } from '../../types/user';
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
  updateUserContactOptions
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
  updateUserContactOptionsFailure

} from '../../actions/user';
import ErrorMessageAlert from '../../../components/error-message-alert';
import { displayToast } from '../../../helpers/toast';
import { getProviderRequestSuccess } from '../../actions/provider';

//profile
function* userProfileHandler(): any {
  try {
    const response = yield call(RequestUserProfile); 
    yield put(getUserprofileSuccess(response));
    yield put(getProviderRequestSuccess(response.data));
  } catch (error) {
    yield put(getUserprofileFailure(error));
  }
}
//recent orders
function* userRecentOrdersHandler(action: any): any {
  try {
    const response = yield call(requestUserRecentOrders, action.authtoken);
    yield put(getUserRecentOrdersSuccess(response));
  } catch (error) {
    yield put(getUserRecentOrdersFailure(error));
  }
}

////favorite orders
function* userFavoriteOrdersHandler(action: any): any {
  try {
    const response = yield call(requestUserFavoriteOrders, action.authtoken);
    yield put(getUserFavoritetOrdersSuccess(response));
  } catch (error) {
    yield put(getUserFavoritetOrdersFailure(error));
  }
}

function* deleleteFavOrderHandler(action: any): any {
  try {
    const response = yield call(
      requestDeleteFavOrder,
      action.favid,
    );
    yield put(deleteFavOrderSuccess());
  } catch (error) {
    yield put(deleteFavOrderFailure(error));
  }
}

//delivery address
function* userDeliveryAddressesHandler(action: any): any {
  try {
    const response = yield call(
      requestUserDeliiveryAddresses,
      action.authtoken,
    );
    yield put(getUserDeliveryAddressesSuccess(response));
  } catch (error) {
    yield put(getUserDeliveryAddressesFailure(error));
  }
}

//// set user default delivery address
function* userDefaultDelAddressHandler(action: any): any {
  try {
    const response = yield call(
      requestSetUserDefDelAddress,
      action.payload,
      action.authtoken,
    );
    yield put(setUserDefaultDelAddressSuccess(response));
  } catch (error) {
    yield put(setUserDefaultDelAddFailure(error));
  }
}

// delete delivery address
function* deleleteDelAddressHandler(action: any): any {
  try {
    const response = yield call(
      requestDelUserDelAddress,
      action.addressid,
      action.authtoken,
    );
    yield put(deleteUserDelAddSuccess());
  } catch (error) {
    yield put(deleteUserDelAddFailure(error));
  }
}

// Update User
function* updateUserHandler(action: any): any {
  try {
    const response = yield call(
      requestUpdateUser,
      action.payload,
    );
    yield put(updateUserSuccess(response));
    displayToast("SUCCESS" , "profile updated successfully");
  } catch (error) {
    yield put(updateUserFailure(error));
    displayToast("ERROR" , "profile not updated");
  }
}

// Update User
function* changePasswordHandler(action: any): any {
  try {
    const response = yield call(
      requestChangePassword,
      action.payload,
    );
    yield put(changePasswordSuccess(response));
    displayToast("SUCCESS" , "password updated successfully");
  } catch (error) {
  
    yield put(changePasswordFailure(error));
    displayToast("ERROR" , "Password need to be new and unused");
  }
}


// Get User BillingAccount Info
function* getUserBillingAccountHandler(action: any): any {
  try {
    const response = yield call(
      requestUserBillingAccount,
      action.authtoken,
    );
    yield put(getAllBillingAccountsSuccess(response));
  } catch (error) {
    yield put(getAllBillingAccountsFailure(error));
  }
}


// Delete User BillingAccount 
function* deleteUserBillingAccountHandler(action: any): any {
  try {
    const response = yield call(
      deleteUserBillingAccount,
      action.authtoken,
      action.billingAccountId
    );
    yield put(deleteBillingAccountSuccess());
  } catch (error) {
    yield put(deleteBillingAccountFailure(error));
  }
}

// Get User BillingAccount Info by id
function* getBillingAccountByIdHandler(action: any): any {
  try {
    const response = yield call(
      requestUserBillingAccountById,
      action.authtoken,
      action.billingAccountId
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
      action.authtoken,
      action.billingAccountId
    );
    yield put(updateBillingAccountSuccess(response));
  } catch (error) {
    yield put(updateBillingAccountFailure(error));
  }
}

// Get User GiftCards Info
function* getUserGiftCardsHandler(action: any): any {
  try {
    const response = yield call(
      requestUseGiftCards,
      action.authtoken,
    );
    yield put(getAllGiftCardsSuccess(response));
  } catch (error) {
    yield put(getAllGiftCardsFailure(error));
  }
}

// Update user contact options
function* updateUserContactOptionsHandler(action: any): any {
  try {
    const response = yield call(
      updateUserContactOptions,
      action.authtoken,
      action.data
    );
    yield put(updateUserContactOptionsSuccess());
  } catch (error) {
    yield put(updateUserContactOptionsFailure(error));
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
  yield takeEvery(
    Type.DELETE_USER_DELIVERY_ADDRESS,
    deleleteDelAddressHandler,
  );
  yield takeEvery(
    Type.UPDATE_USER,
    updateUserHandler,
  );
  yield takeEvery(
    Type.CHANGE_PASSWORD,
    changePasswordHandler,
  );
  yield takeEvery(
    Type.GET_BILLING_ACCOUNTS,
    getUserBillingAccountHandler,
  );
  yield takeEvery(
    Type.GET_BILLING_ACCOUNT_BY_ID,
    getBillingAccountByIdHandler,
  ); 
  yield takeEvery(
    Type.DELETE_BILLING_ACCOUNTS,
    deleteUserBillingAccountHandler,
  ); 
   yield takeEvery(
    Type.UPDATE_BILLING_ACCOUNTS,
    updateUserBillingAccountHandler,
  );
  yield takeEvery(
    Type.GET_GIFT_CARDS,
    getUserGiftCardsHandler,
  );
  yield takeEvery(
    Type.DELETE_FAV_ORDER,
    deleleteFavOrderHandler,
  );
  yield takeEvery(
    Type.UPDATE_USER_CONTACT_OPTIONS,
    updateUserContactOptionsHandler,
  );
}


