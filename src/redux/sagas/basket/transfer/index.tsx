import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import {
  basketTransferSuccess,
  basketTransferFailure,
} from '../../../actions/basket/transfer';
import { basketTransfer, setBasketDeliveryMode } from '../../../../services/basket';
import { DeliveryModeEnum } from '../../../../types/olo-api/olo-api.enums';

function* asyncBasketTransferSaga(action: any): any {
  try {
    console.log('action', action)
    console.log('action new', action?.deliveryMode === DeliveryModeEnum.dispatch)
    if(action?.deliveryMode === DeliveryModeEnum.dispatch){
      const modeResponse = yield call(
        setBasketDeliveryMode,
        action.basketId,
        {
          deliverymode: 'pickup'
        }
      );

    }
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
