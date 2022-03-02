import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { categoryItemsSaga } from './category';
import { storeToken } from './token';
import { userSaga } from './user';
import {redeemRewardSada} from './reward';
import { restaurantInfoSaga } from './restaurant';
import { restaurantCalendarSaga } from './restaurant/calendar';
import { productOptionsSaga } from './product/option';
import { storeProvider } from './provider';
import { storeAuth } from './auth';
import { resturantListSaga } from './restaurant/list';
import { locationSaga } from './location';
import { BasketSaga } from './basket';
import { dummyBasketSaga } from './basket/dummy';
import { addSingleProductSaga } from './basket/addSingleProduct';
import {addMultipleProductsSaga} from './basket/addMultipleProducts';

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
    redeemRewardSada(),
    dummyBasketSaga(),
    BasketSaga(),
    addSingleProductSaga(),
    addMultipleProductsSaga()
  ]);
}
