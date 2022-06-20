import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  addMultipleProductsFailure,
  addMultipleProductsSuccess,
  updateMultipleProductsSuccess,
  updateMultipleProductsFailure,
} from '../../../actions/basket/addMultipleProducts';
import {
  addMultipleProducts,
  updateMultipleProducts,
} from '../../../../services/basket';
import {
  addUpsellsRequestFailure,
  addUpsellsRequestSuccess,
} from '../../../actions/basket/upsell/Add';

function* asyncAddMultipleProductsRequest(action: any): any {
  try {
    const response = yield call(
      addMultipleProducts,
      action.basketid,
      action.request,
    );
    // yield put(addMultipleProductsSuccess(response));
    if (response && response.errors && response.errors.length) {
      yield put(addUpsellsRequestFailure(response));
    } else {
      yield put(addUpsellsRequestSuccess(response));
    }
  } catch (error) {
    yield put(addUpsellsRequestFailure(error));
  }
}

function* asyncUpdateMultipleProductsRequest(action: any): any {
  try {
    console.log('abc');
    const response = yield call(
      updateMultipleProducts,
      action.basketid,
      action.request,
    );
    yield put(updateMultipleProductsSuccess(response));
  } catch (error) {
    yield put(updateMultipleProductsFailure(error));
  }
}

export function* addMultipleProductsSaga() {
  yield takeEvery(
    basketActionsTypes.ADD_MULTIPLE_PRODUCT_REQUEST,
    asyncAddMultipleProductsRequest,
  );
}

export function* updateMultipleProductsSaga() {
  yield takeEvery(
    basketActionsTypes.UPDATE_MULTIPLE_PRODUCT_REQUEST,
    asyncUpdateMultipleProductsRequest,
  );
}
