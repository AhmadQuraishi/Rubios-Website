import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { storeToken } from './token';

export default function* rootSaga() {
  yield all([storeToken()]);
  yield all([footerMenuItemSaga()]);
 
}
