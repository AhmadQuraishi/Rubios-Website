import { combineReducers } from 'redux';
import footerReducer from './footer';
import menuReducer from './menu';
import tokenReducer from "./token";

const rootReducers = combineReducers({tokenReducer, footerReducer, menuReducer });

export default rootReducers;

export type rootState = ReturnType<typeof rootReducers>;
