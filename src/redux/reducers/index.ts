import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import footerReducer from './footer';
import categoryReducer from './category';
import userReducer from './user';
import TokensReducer from './Tokens';
import storage from 'redux-persist/lib/storage';
import restaurantInfoReducer from './restaurant';
import locationReducer from './location';
import restaurantCalendarReducer from './restaurant/calendar';
import productOptionsReducer from './product/option';
import providerReducer from './provider';
import authReducer from './auth';
import restaurantListReducer from './restaurant/list';
import dummyBasketReducer from './basket/dummy';
import basketReducer from './basket';
import addSingleProductReducer from './basket/addSingleProduct';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['restaurantInfoReducer', 'basketReducer'],
};

const rootReducers = combineReducers({
  TokensReducer,
  categoryReducer,
  footerReducer,
  userReducer,
  restaurantInfoReducer,
  locationReducer,
  restaurantCalendarReducer,
  productOptionsReducer,
  providerReducer,
  authReducer,
  restaurantListReducer,
  dummyBasketReducer,
  basketReducer,
  addSingleProductReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export default persistReducers;
