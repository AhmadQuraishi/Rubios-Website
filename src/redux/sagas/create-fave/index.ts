import { takeEvery, put, call } from 'redux-saga/effects';
import { createFaveTypes as Type } from '../../types/create-fave';
import { checkInFailure, checkInSuccess } from '../../actions/check-in';
import { requestCreateFave } from '../../../services/create-fave';
import {
  createFaveFailure,
  createFaveSuccess,
} from '../../actions/create-fave';
import {
  markOrderFav,
  updateLocalRecentOrdersList,
} from '../../../helpers/setRecentOrders';
import { requestUserRecentOrders } from '../../../services/user';
import { getUserRecentOrdersSuccess } from '../../actions/user';

function* createFaveHandler(action: any): any {
  try {
    const response = yield call(requestCreateFave, action.payload);
    const favId =
      (response &&
        response.faves &&
        response.faves.length &&
        response.faves[0].id) ||
      '';
    markOrderFav(action.payload.basketid, favId, true);
    updateLocalRecentOrdersList();
    const recentorders = yield call(requestUserRecentOrders);
    yield put(getUserRecentOrdersSuccess(recentorders));
    yield put(createFaveSuccess(response));
  } catch (error) {
    yield put(createFaveFailure(error));
  }
}
export function* createFaveSaga() {
  yield takeEvery(Type.CREATE_FAVE, createFaveHandler);
}
