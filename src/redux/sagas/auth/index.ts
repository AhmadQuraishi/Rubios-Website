import { takeEvery,select, put, call } from 'redux-saga/effects';
import { authActionsTypes } from '../../types/auth';
import { getAuthToken } from '../../../services/auth';
import {
  getAuthRequestFailure,
  getAuthRequestSuccess,
} from '../../actions/auth';
import { navigateAppAction } from '../../actions/navigate-app';

function* asyncAuthItemRequest(action: any): any {
  // const restaurant = action.restaurant;
  const restaurant = yield select(state => state.restaurantInfoReducer);
  const basket = yield select(state => state.basketReducer);
  console.log(restaurant,'restaurant');

  try {
    const response = yield call(getAuthToken, action.basketID);
    yield put(getAuthRequestSuccess(action.successMsg, response.data));
    if (
      action.basketID === "" &&
      action?.registerType &&
      (action.registerType === 'REGISTER_MAIN' ||
        action.registerType === 'REGISTER_CONFIRMATION')
    ) {
      yield put(navigateAppAction('/welcome?new_user=true'));
    }
    else if (
      basket?.basket?.tip === 0 &&
      action?.basketID !== "" &&
      action?.registerType &&
      (action.registerType === 'REGISTER_MAIN' ||
        action.registerType === 'REGISTER_CONFIRMATION')
    ) {
      yield put(navigateAppAction(`/menu/${restaurant.restaurant.slug}?cart=true`));
    }
    else if (basket?.basket?.tip > 0 &&
      action?.basketID !== "" &&
      action?.registerType &&
      (action.registerType === 'REGISTER_MAIN' ||
        action.registerType === 'REGISTER_CONFIRMATION')
      ) {
        yield put(navigateAppAction(`/checkout`));
      }
     else if (
      action?.registerType &&
      action.registerType === 'REGISTER_CHECKOUT'
    ) {
      setTimeout(() => {
        window.location.href = '/checkout';
      }, 500);
    }
  } catch (error) {
    yield put(getAuthRequestFailure(error));
  }
}
export function* storeAuth() {
  yield takeEvery(authActionsTypes.GET_AUTHTOKEN_REQUEST, asyncAuthItemRequest);
}
