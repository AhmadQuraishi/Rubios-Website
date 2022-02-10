import { takeEvery, put, call } from 'redux-saga/effects';
import { categoryActionsTypes } from '../../types/category';
import { getMenuItem } from '../../../services/menu';
import {
  getCategoriesRequestSuccess,
  getCategoriesRequestFailure,
} from '../../actions/category';

function* asyncCategoriesRequest(action: any): any {
  try {
    debugger;
    const response = yield call(getMenuItem, action.storeID);
    yield put(getCategoriesRequestSuccess(response));
  } catch (error) {
    yield put(getCategoriesRequestFailure(error));
  }
}

export function* categoryItemsSaga() {
  yield takeEvery(categoryActionsTypes.GET_CATEGORY_ITMES_REQUEST, asyncCategoriesRequest);
}
