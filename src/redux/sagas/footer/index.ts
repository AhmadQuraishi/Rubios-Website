import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { footerActionsTypes as Type } from '../../types/footer';
import { getFooterMenu } from '../../../services/footer';
import {
  getMenuRequestFailure,
  getMenuRequestSuccess,
} from '../../actions/footer';

function* asyncMenuItemRequest(): any {
  try {
    const response = yield call(getFooterMenu);
    yield put(getMenuRequestSuccess(response));
  } catch (error) {
    yield put(getMenuRequestFailure(error));
  }
}

export function* footerMenuItemSaga() {
  yield takeEvery(Type.GET_FOOTER_ITMES_REQUEST, asyncMenuItemRequest);
}
