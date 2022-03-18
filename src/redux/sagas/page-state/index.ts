import { takeEvery, put } from 'redux-saga/effects';
import { pageStateType as Type } from '../../types/page-state';

import {
  setPageStateRequestSuccess,
  setPageStateRequestFailure,
} from '../../actions/page-state';

function* setPageStateHandler(action: any): any {
  try {
    yield put(setPageStateRequestSuccess(action.pageURL));
  } catch (error) {
    yield put(setPageStateRequestFailure(error));
  }
}

export function* pageStateSaga() {
  yield takeEvery(Type.SET_PAGE_STATE_REQUEST, setPageStateHandler);
}
