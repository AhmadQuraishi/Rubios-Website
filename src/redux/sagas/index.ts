import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { menuItemSaga } from './menu';

export default function* rootSaga() {
  yield all([footerMenuItemSaga(), menuItemSaga()]);
}
