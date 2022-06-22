import { takeEvery, put, call } from 'redux-saga/effects';
import { categoryActionsTypes } from '../../types/category';
import { getMenuItem } from '../../../services/menu';
import {
  getCategoriesRequestSuccess,
  getCategoriesRequestFailure,
} from '../../actions/category';
import {updateUtensilsProductId} from "../../actions/basket/utensils";

function* asyncCategoriesRequest(action: any): any {
  try {
    const response = yield call(getMenuItem, action.restaurantID);
    yield put(getCategoriesRequestSuccess(response));
    yield put(updateUtensilsProductId(response));
  } catch (error) {
    yield put(getCategoriesRequestFailure(error));
  }
}

export function* categoryItemsSaga() {
  yield takeEvery(
    categoryActionsTypes.GET_CATEGORY_ITMES_REQUEST,
    asyncCategoriesRequest,
  );
}
