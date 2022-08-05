import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import footerReducer from './footer';
import categoryReducer from './category';
import userReducer from './user';
import rewardReducer from './reward';
import rewardReducerNew from './reward-new';
import tokenReducer from './token';
import TokensReducer from './Tokens';
import storage from 'redux-persist/lib/storage';
import restaurantInfoReducer from './restaurant';
import locationReducer from './location';
import restaurantCalendarReducer from './restaurant/calendar';
import productOptionsReducer from './product/option';
import providerReducer from './provider';
import authReducer from './auth';
import restaurantListReducer from './restaurant/list';
import createBasketReducer from './basket/create';
import basketReducer from './basket';
// import addMultipleProductsReducer from './basket/addMultipleProducts';
import addProductReducer from './basket/product/add';
import removeProductReducer from './basket/product/remove';
import checkInReducer from './check-in';
import updateProductReducer from './basket/product/update';
import favRestaurantReducer from './restaurant/fav-restaurant';
import accountHistoryReducer from './account-history';
import pageStateReducer from './page-state';
import redemptionReducer from './redemption';
import addUpsellReducer from './basket/upsell/add';
import getUpsellsReducer from './basket/upsell/get';
import getRewardForCheckoutReducer from './reward/checkout';
import applyRewardOnBasketReducer from './reward/checkout/apply';
import removeRewardFromBasketReducer from './reward/checkout/remove';
import orderReducer from './order';
import navigateAppReducer from './navigate-app';
import deliveryAddressReducer from './location/delivery-address';
import verifyDeliveryAddressReducer from './location/verify-delivery-address';
import utensilsReducer from './basket/utensils';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'restaurantInfoReducer',
    'basketReducer',
    'authReducer',
    'tokenReducer',
    'userReducer',
    'providerReducer',
    'redemptionReducer',
    'pageStateReducer',
    'getUpsellsReducer',
    'orderReducer',
    'navigateAppReducer',
    'deliveryAddressReducer',
    'utensilsReducer',
  ],
};

const rootReducers = combineReducers({
  tokenReducer,
  TokensReducer,
  categoryReducer,
  footerReducer,
  userReducer,
  rewardReducer,
  rewardReducerNew,
  utensilsReducer,
  restaurantInfoReducer,
  locationReducer,
  restaurantCalendarReducer,
  productOptionsReducer,
  providerReducer,
  authReducer,
  restaurantListReducer,
  createBasketReducer,
  basketReducer,
  orderReducer,
  // addMultipleProductsReducer,
  addProductReducer,
  removeProductReducer,
  checkInReducer,
  updateProductReducer,
  favRestaurantReducer,
  accountHistoryReducer,
  pageStateReducer,
  redemptionReducer,
  addUpsellReducer,
  getUpsellsReducer,
  getRewardForCheckoutReducer,
  applyRewardOnBasketReducer,
  removeRewardFromBasketReducer,
  navigateAppReducer,
  deliveryAddressReducer,
  verifyDeliveryAddressReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export default persistReducers;
