import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../../types/basket';
import {
  addProductSuccess,
  addProductFailure,
} from '../../../../actions/basket/product/add';
import { addSingleProduct } from '../../../../../services/basket';

function* asyncAddProductRequest(action: any): any {
  try {
    const response = yield call(
      addSingleProduct,
      action.basketid,
      action.request,
    );
    yield put(addProductSuccess(response));
  } catch (error) {
    yield put(addProductFailure(error));
  }
}

export function* addProductSaga() {
  yield takeEvery(
    basketActionsTypes.ADD_PRODUCT_REQUEST,
    asyncAddProductRequest,
  );
}
