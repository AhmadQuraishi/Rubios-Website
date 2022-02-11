import { combineReducers } from 'redux';
import footerReducer from './footer';
import categoryReducer from './category';
import userReducer from './user';
import TokensReducer from './Tokens';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['categoriesData'],
};

const rootReducers = combineReducers({
  TokensReducer,
  categoriesData: categoryReducer,
  footerReducer,
  userReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export default persistReducers;
