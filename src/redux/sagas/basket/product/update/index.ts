import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../../types/basket';
import {
  updateProductSuccess,
  updateProductFailure,
} from '../../../../actions/basket/product/update';
import { updateProduct } from '../../../../../services/basket';

function* asyncUpdateProductRequest(action: any): any {
  try {
    const response = yield call(
      updateProduct,
      action.basketid,
      action.basketProductId,
      action.request,
    );
    yield put(updateProductSuccess(response));
  } catch (error) {
    yield put(updateProductFailure(error));
  }
}

export function* updateProductSaga() {
  yield takeEvery(
    basketActionsTypes.UPDATE_PRODUCT_REQUEST,
    asyncUpdateProductRequest,
  );
}
