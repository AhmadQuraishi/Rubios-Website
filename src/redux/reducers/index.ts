import { combineReducers } from 'redux';
import footerReducer from './footer';
import categoryReducer from './category';
import tokenReducer from './token';

const rootReducers = combineReducers({
  tokenReducer,
  categoryReducer,
  footerReducer,
});

export default rootReducers;
