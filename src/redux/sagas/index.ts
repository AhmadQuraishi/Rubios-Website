import { all } from 'redux-saga/effects';
import { footerMenuItemSaga } from './footer';
import { categoryItemsSaga } from './category';
import { storeToken } from './token';
import { userSaga } from './user';
import { redeemRewardSada } from './reward';
import { restaurantInfoSaga } from './restaurant';
import { restaurantCalendarSaga } from './restaurant/calendar';
import { productOptionsSaga } from './product/option';
import { storeProvider } from './provider';
import { storeAuth } from './auth';
import { resturantListSaga } from './restaurant/list';
import { locationSaga } from './location';
import { BasketSaga } from './basket';
import { addMultipleProductsSaga } from './basket/addMultipleProducts';
import { checkoutSaga } from './basket/checkout';
import { createBasketSaga } from './basket/create';
import { addProductSaga } from './basket/product/add';
import { removeProductSaga } from './basket/product/remove';
import { updateProductSaga } from './basket/product/update';
import { checkinSaga } from './check-in';
import { favRestaurantSaga } from './restaurant/fav-restaurant';
import { redemptionSaga } from './reward/redemption';
import { accountHistorySaga } from './account-history';

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
    createBasketSaga(),
    BasketSaga(),
    addMultipleProductsSaga(),
    checkoutSaga(),
    addProductSaga(),
    removeProductSaga(),
    updateProductSaga(),
    checkinSaga(),
    favRestaurantSaga(),
    redemptionSaga(),
    accountHistorySaga()
  ]);
}
