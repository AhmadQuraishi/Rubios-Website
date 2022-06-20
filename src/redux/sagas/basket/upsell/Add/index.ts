import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../../types/basket';
import {
  addUpsellsRequestSuccess,
  addUpsellsRequestFailure,
} from '../../../../actions/basket/upsell/Add';
import { addSingleProduct } from '../../../../../services/basket';

function* asyncAddUpsellsRequest(action: any): any {
  try {
    const response = yield call(
      addSingleProduct,
      action.basketid,
      action.request,
    );
    const updatedResponse = {
      basket: response,
    };
    yield put(addUpsellsRequestSuccess(updatedResponse));
  } catch (error) {
    yield put(addUpsellsRequestFailure(error));
  }
}

export function* addUpsellsSaga() {
  yield takeEvery(
    basketActionsTypes.ADD_UPSELLS_REQUEST,
    asyncAddUpsellsRequest,
  );
}
