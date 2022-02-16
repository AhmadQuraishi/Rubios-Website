import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { userTypes as Type } from '../../types/user';
import {
  RequestUserProfile,
  requestUserRecentOrders,
  requestUserFavoriteOrders,
  requestUserDeliiveryAddresses,
  requestSetUserDefDelAddress,
  requestDelUserDelAddress,
  requestUpdateUser,
  requestChangePassword
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
  changePasswordFailure
} from '../../actions/user';

//profile
function* userProfileHandler(): any {
  try {
    const response = yield call(RequestUserProfile);
    yield put(getUserprofileSuccess(response));
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
  } catch (error) {
    yield put(updateUserFailure(error));
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
  } catch (error) {
    yield put(changePasswordFailure(error));
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
}


