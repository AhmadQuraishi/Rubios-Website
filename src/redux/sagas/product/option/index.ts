import { takeEvery, put, call } from 'redux-saga/effects';
import { productOptionActionsTypes } from '../../../types/product/option';
import { getProductOption } from '../../../../services/product/option';
import {
  getProductOptionRequestFailure,
  getProductOptionRequestSuccess,
} from '../../../actions/product/option';

function* asyncProductOptionsRequest(action: any): any {
  try {
    const response = yield call(getProductOption, action.id);
    yield put(getProductOptionRequestSuccess(response));
  } catch (error) {
    yield put(getProductOptionRequestFailure(error));
  }
}

export function* productOptionsSaga() {
  yield takeEvery(
    productOptionActionsTypes.GET_PRODUCT_OPTION_REQUEST,
    asyncProductOptionsRequest,
  );
}
