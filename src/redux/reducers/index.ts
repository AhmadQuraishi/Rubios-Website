import { combineReducers } from 'redux';
import footerReducer from './footer';
import menuReducer from './menu';
import tokenReducer from './token';
import TokensReducer from './Tokens';
import userProfileReducer from './userProfile';

const rootReducers = combineReducers({
  tokenReducer,
  footerReducer,
  menuReducer,
  TokensReducer,
  userProfileReducer,
});

export default rootReducers;

export type rootState = ReturnType<typeof rootReducers>;
