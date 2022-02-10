import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { categoryItemsSaga } from './category';
import { storeToken } from './token';

export default function* rootSaga() {
  yield all([storeToken(), categoryItemsSaga(), footerMenuItemSaga()]);
}
