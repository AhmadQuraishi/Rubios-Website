import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { categoryItemsSaga } from './category';
import { storeToken } from './token';
import { userSaga } from './user';
import { restaurantInfoSaga } from './restaurant';
import { restaurantCalendarSaga } from './restaurant/calendar';
import { productOptionsSaga } from './product/option';
import { storeProvider } from './provider';
import { storeAuth } from './auth';
import { resturantListSaga } from './restaurant/list';
import { locationSaga } from './location';
import { BasketSaga } from './basket';
import { singleRestaurantCalendarSaga } from './basket/calendar';
import { dummyBasketSaga } from './basket/dummy';
import { addSingleProductSaga } from './basket/addSingleProduct';

export default function* rootSaga() {
  yield all([
    storeToken(),
    categoryItemsSaga(),
    footerMenuItemSaga(),
    userSaga(),
    restaurantInfoSaga(),
    restaurantCalendarSaga(),
    locationSaga(),
    productOptionsSaga(),
    storeProvider(),
    storeAuth(),
    resturantListSaga(),
    dummyBasketSaga(),
    BasketSaga(),
    singleRestaurantCalendarSaga(),
    addSingleProductSaga(),
  ]);
}
