import { combineReducers } from 'redux';
import footerReducer from './footer';
import menuReducer from './menu';

const rootReducers = combineReducers({ footerReducer, menuReducer });

export default rootReducers;

export type rootState = ReturnType<typeof rootReducers>;
