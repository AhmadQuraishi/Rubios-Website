import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../../types/basket';
import {
  addUpsellsRequestSuccess,
  addUpsellsRequestFailure,
} from '../../../../actions/basket/upsell/Add';
import { addUpSells } from '../../../../../services/basket';

function* asyncAddUpsellsRequest(action: any): any {
  try {
    const response = yield call(addUpSells, action.basketid, action.request);
    yield put(addUpsellsRequestSuccess(response));
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
