import { combineReducers } from 'redux';
import footerReducer from './footer';
import tokenReducer from "./token";

const rootReducers = combineReducers({tokenReducer, footerReducer });

export default rootReducers;

export type rootState = ReturnType<typeof rootReducers>;
