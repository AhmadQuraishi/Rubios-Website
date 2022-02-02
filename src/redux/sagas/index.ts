import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';

export default function* rootSaga() {
  yield all([footerMenuItemSaga()]);
}
