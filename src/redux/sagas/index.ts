import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { menuItemSaga } from './menu';
import { storeToken } from './token';

export default function* rootSaga() {
  yield all([storeToken(), footerMenuItemSaga(), menuItemSaga()]);
}
