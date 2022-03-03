import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import footerReducer from './footer';
import categoryReducer from './category';
import userReducer from './user';
import rewardReducer from './reward';
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
import addMultipleProductsReducer from './basket/addMultipleProducts';
import addProductReducer from './basket/product/add';
import removeProductReducer from './basket/product/remove';
import checkInReducer from './check-in';
import updateProductReducer from './basket/product/update';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['restaurantInfoReducer', 'basketReducer'],
};

const rootReducers = combineReducers({
  tokenReducer,
  TokensReducer,
  categoryReducer,
  footerReducer,
  userReducer,
  rewardReducer,
  restaurantInfoReducer,
  locationReducer,
  restaurantCalendarReducer,
  productOptionsReducer,
  providerReducer,
  authReducer,
  restaurantListReducer,
  createBasketReducer,
  basketReducer,
  addMultipleProductsReducer,
  addProductReducer,
  removeProductReducer,
  checkInReducer,
  updateProductReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export default persistReducers;
