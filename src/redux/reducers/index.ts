import { combineReducers } from 'redux';
import footerReducer from './footer';
import categoryReducer from './category';
import tokenReducer from './token';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['categoriesData'],
};

const rootReducers = combineReducers({
  tokenReducer,
  categoriesData: categoryReducer,
  footerReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export default persistReducers;
