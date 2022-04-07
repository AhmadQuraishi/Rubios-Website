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
import { pageStateSaga } from './page-state';
import { redemptionSaga } from './reward/redemption';
import { accountHistorySaga } from './account-history';
import { createFaveSaga } from './create-fave';
import { addUpsellsSaga } from './basket/upsell/Add';
import { getUpsellsSaga } from './basket/upsell/Get';
import { getRewardsForCheckoutSaga } from './reward/checkout';
import { applyRewardsForCheckoutSaga } from './reward/checkout/apply';
import { removeRewardFromBasketSaga } from './reward/checkout/remove';

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
    pageStateSaga(),
    redemptionSaga(),
    accountHistorySaga(),
    createFaveSaga(),
    addUpsellsSaga(),
    getUpsellsSaga(),
    getRewardsForCheckoutSaga(),
    applyRewardsForCheckoutSaga(),
    removeRewardFromBasketSaga(),
  ]);
}
