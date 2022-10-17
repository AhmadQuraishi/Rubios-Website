import { takeEvery, put, call } from 'redux-saga/effects';
import { createFaveTypes as Type } from '../../types/create-fave';
// import { checkInFailure, checkInSuccess } from '../../actions/check-in';
import { requestCreateFave } from '../../../services/create-fave';
import {
  createFaveFailure,
  createFaveSuccess,
} from '../../actions/create-fave';
// import {
//   markOrderFav,
//   updateLocalRecentOrdersList,
// } from '../../../helpers/setRecentOrders';
// import { requestUserRecentOrders } from '../../../services/user';
// import { getUserRecentOrdersSuccess } from '../../actions/user';
import { requestCreateBasket } from '../../../services/basket';

function* createFaveHandler(action: any): any {
  try {
    const basketResponse = yield call(
      requestCreateBasket,
      action.payload.order,
    );
    const payload = {
      ...action.payload.basket,
      basketid: basketResponse.id,
    };
    yield call(requestCreateFave, payload);
    // const recentorders = yield call(requestUserRecentOrders);
    // yield put(getUserRecentOrdersSuccess(recentorders));
    yield put(createFaveSuccess());
  } catch (error) {
    yield put(createFaveFailure(error));
  }
}
export function* createFaveSaga() {
  yield takeEvery(Type.CREATE_FAVE, createFaveHandler);
}
