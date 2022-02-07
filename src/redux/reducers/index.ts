import { combineReducers } from 'redux';
import footerReducer from './footer';

const rootReducers = combineReducers({ footerReducer });

export default rootReducers;

export type rootState = ReturnType<typeof rootReducers>;
