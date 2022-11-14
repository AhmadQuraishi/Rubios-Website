import { takeEvery, put, call } from 'redux-saga/effects';
import { locationTypes as Type } from '../../types/location';

import {
  getLocationsFailure,
  getLocationsSuccess,
  getSingleLocationFailure,
  getSingleLocationSuccess,
} from '../../actions/location';
import {
  requestLocations,
  requestSingleLocation,
} from '../../../services/location';

function* getLocationHandler(): any {
  try {
    const response = yield call(requestLocations);
    yield put(getLocationsSuccess(response));
  } catch (error) {
    yield put(getLocationsFailure(error));
  }
}
function* getSingleLocationHandler(action: any): any {
  console.log('store_number', action)
  try {
    const response = yield call(
      requestSingleLocation,
      action?.payload,
    );
    yield put(getSingleLocationSuccess(response));
  } catch (error) {
    yield put(getSingleLocationFailure(error));
  }
}

export function* locationSaga() {
  yield takeEvery(Type.GET_LOCATIONS, getLocationHandler);
  yield takeEvery(Type.GET_SINGLE_LOCATION, getSingleLocationHandler);
}
