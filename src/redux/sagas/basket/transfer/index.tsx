import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  basketTransferSuccess,
  basketTransferFailure,
} from '../../../actions/basket/transfer';
import { basketTransfer } from '../../../../services/basket';

function* asyncBasketTransferSaga(action: any): any {
  try {
    const response = yield call(
      basketTransfer,
      action.basketId,
      action.vendorId,
    );
    yield put(basketTransferSuccess(response));
  } catch (error) {
    yield put(basketTransferFailure(error));
  }
}

export function* basketTransferSaga() {
  yield takeEvery(
    basketActionsTypes.BASKET_TRANSFER_REQUEST,
    asyncBasketTransferSaga,
  );
}
