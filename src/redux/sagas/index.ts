import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { categoryItemsSaga } from './category';
import { storeToken } from './token';
import { userSaga } from './user';
import { restaurantInfoSaga } from './restaurant';
import { restaurantCalendarSaga } from './restaurant/calendar';
import { productOptionsSaga } from './product/option';
import { storeProvider } from './provider'

export default function* rootSaga() {
  yield all([
    storeToken(),
    categoryItemsSaga(),
    footerMenuItemSaga(),
    userSaga(),
    restaurantInfoSaga(),
    restaurantCalendarSaga(),
    productOptionsSaga(),
    storeProvider(),
  ]);
}
