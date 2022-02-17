import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { locationTypes as Type } from '../../types/location';

import { getLocationsFailure, getLocationsSuccess } from '../../actions/location';
import { requestLocations } from '../../../services/location';

function* getLocationHandler(): any {
  try {
    const response = yield call(requestLocations);
    yield put(getLocationsSuccess(response));
  } catch (error) {
    yield put(getLocationsFailure(error));
  }
}




export function* locationSaga() {
  yield takeEvery(Type.GET_LOCATIONS, getLocationHandler);

}


