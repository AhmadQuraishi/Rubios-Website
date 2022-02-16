import { combineReducers } from 'redux';
import footerReducer from './footer';
import categoryReducer from './category';
import userReducer from './user';
import TokensReducer from './Tokens';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import restaurantInfoReducer from './restaurant';
import locationReducer from './location';

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
  locationReducer
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export default persistReducers;
