import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  addSingleProducttSuccess,
  addSingleProductFailure,
} from '../../../actions/basket/addSingleProduct';
import { addSingleProduct } from '../../../../services/basket';

function* asyncAddSingleProductRequest(action: any): any {
  try {
    const response = yield call(
      addSingleProduct,
      action.basketid,
      action.request,
    );
    yield put(addSingleProducttSuccess(response));
  } catch (error) {
    yield put(addSingleProductFailure(error));
  }
}

export function* addSingleProductSaga() {
  yield takeEvery(
    basketActionsTypes.ADD_SINGLE_PRODUCT_REQUEST,
    asyncAddSingleProductRequest,
  );
}
