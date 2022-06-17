import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import { addSingleProduct, removeProduct } from '../../../../services/basket';
import {
  addUtensilsRequestFailure,
  addUtensilsRequestSuccess,
  removeUtensilsRequestFailure,
  removeUtensilsRequestSuccess,
} from '../../../actions/basket/utensils';

function* asyncAddUtensilsRequest(action: any): any {
  try {
    const response = yield call(
      addSingleProduct,
      action.basketid,
      action.request,
    );
    yield put(addUtensilsRequestSuccess(response));
  } catch (error) {
    yield put(addUtensilsRequestFailure(error));
  }
}

function* asyncRemoveUtensilsRequest(action: any): any {
  try {
    const response = yield call(
      removeProduct,
      action.basketid,
      action.basketProductId
    );
    yield put(removeUtensilsRequestSuccess(response));
  } catch (error) {
    yield put(removeUtensilsRequestFailure(error));
  }
}

export function* utensilsSaga() {
  yield takeEvery(
    basketActionsTypes.ADD_UTENSILS_REQUEST,
    asyncAddUtensilsRequest,
  );
  yield takeEvery(
    basketActionsTypes.REMOVE_UTENSILS_REQUEST,
    asyncRemoveUtensilsRequest,
  );
}
