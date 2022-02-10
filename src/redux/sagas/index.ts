import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { menuItemSaga } from './menu';
import { storeToken } from './token';
import { userProfileSaga } from './userProfile';

export default function* rootSaga() {
  yield all([
    storeToken(),
    footerMenuItemSaga(),
    menuItemSaga(),
    userProfileSaga(),
  ]);
}
