import { takeEvery, put, call } from 'redux-saga/effects';
import { MenuActionsTypes as Type } from '../../types/menu';
import { getMenuItem } from '../../../services/menu';
import {
  getMenuRequestFailure,
  getMenuRequestSuccess,
} from '../../actions/menu';

function* asyncMenuItemRequest(action: any): any {
  try {
    const response = yield call(getMenuItem, action.storeID);
    yield put(getMenuRequestSuccess(response));
  } catch (error) {
    yield put(getMenuRequestFailure(error));
  }
}

export function* menuItemSaga() {
  yield takeEvery(Type.GET_MENU_ITMES_REQUEST, asyncMenuItemRequest);
}
