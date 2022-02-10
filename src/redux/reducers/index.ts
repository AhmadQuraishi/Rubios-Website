import { combineReducers } from 'redux';
import footerReducer from './footer';
import categoryReducer from './category';
import tokenReducer from './token';
import userProfileReducer from './userProfile';
import TokensReducer from './Tokens';

const rootReducers = combineReducers({
  tokenReducer,
  categoryReducer,
  footerReducer,
  TokensReducer,
  userProfileReducer,
});

export default rootReducers;
