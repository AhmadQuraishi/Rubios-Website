import { takeEvery, put, call } from 'redux-saga/effects';
// import { facebookSendEventSuccess, facebookSendEventFailure } from '../../actions/facebook-conversion';
import { facebookConversionTypes as Type } from '../../types/facebook-conversion';
import { requestFacebookConversion } from '../../../services/facbook-conversion';

function* facebookConversionHandler(action: any): any {
  try {
    const response = yield call(
      requestFacebookConversion,
      action.eventType,
      action.userData,
      action.customData,
    );
  } catch (error) {
  }
}
export function* facebookConversionSaga() {
  yield takeEvery(Type.FACEBOOK_EVENT_REQUEST, facebookConversionHandler);
}
