import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  addMultipleProductsFailure,
  addMultipleProductsSuccess
} from '../../../actions/basket/addMultipleProducts';
import { addMultipleProducts } from '../../../../services/basket';

function* asyncAddMultipleProductsRequest(action: any): any {
  try {
    const response = yield call(
        addMultipleProducts,
      action.basketid,
      action.request,
    );
    yield put(addMultipleProductsSuccess(response));
  } catch (error) {
    yield put(addMultipleProductsFailure(error));
  }
}

export function* addMultipleProductsSaga() {
  yield takeEvery(
    basketActionsTypes.ADD_MULTIPLE_PRODUCT_REQUEST,
    asyncAddMultipleProductsRequest,
  );
}
