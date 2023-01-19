import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../../types/basket';
import {
  getUpsellsRequestSuccess,
  getUpsellsRequestFailure,
} from '../../../../actions/basket/upsell/Get';
import { getUpSells } from '../../../../../services/basket';

function* asyncGetUpsellsRequest(action: any): any {
  try {
      const response = yield call(getUpSells, action.vendorid);
      yield put(getUpsellsRequestSuccess({
        data: response,
        vendorId: action.vendorid
      }));
  } catch (error) {
    yield put(getUpsellsRequestFailure(error));
  }
}

export function* getUpsellsSaga() {
  yield takeEvery(
    basketActionsTypes.GET_UPSELLS_REQUEST,
    asyncGetUpsellsRequest,
  );
}
