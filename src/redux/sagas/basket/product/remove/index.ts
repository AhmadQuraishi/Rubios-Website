import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../../types/basket';
import {
  removeProductSuccess,
  removeProductFailure,
} from '../../../../actions/basket/product/remove';
import { removeProduct } from '../../../../../services/basket';

function* asyncRemoveProductRequest(action: any): any {
  try {
    const response = yield call(
      removeProduct,
      action.basketid,
      action.basketProductId
    );
    yield put(removeProductSuccess(response));
  } catch (error) {
    yield put(removeProductFailure(error));
  }
}

export function* removeProductSaga() {
  yield takeEvery(
    basketActionsTypes.REMOVE_PRODUCT_REQUEST,
    asyncRemoveProductRequest,
  );
}
