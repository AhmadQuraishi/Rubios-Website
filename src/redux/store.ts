import { createStore, applyMiddleware } from "redux";
import persistReducers from "./reducers";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

export const store = createStore(persistReducers, {}, applyMiddleware(thunk));

export const persistor = persistStore(store);

export default {store, persistor}
