import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import footerReducer from './footer';
import categoryReducer from './category';
import userReducer from './user';
import TokensReducer from './Tokens';
import storage from 'redux-persist/lib/storage';
import restaurantInfoReducer from './restaurant';
import restaurantCalendarReducer from './restaurant/calendar';
import productOptionsReducer from './product/option';
import restaurantListReducer from './restaurant/list';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const rootReducers = combineReducers({
  TokensReducer,
  categoryReducer,
  footerReducer,
  userReducer,
  restaurantInfoReducer,
  restaurantCalendarReducer,
  productOptionsReducer,
  restaurantListReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export default persistReducers;
