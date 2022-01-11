import { combineReducers } from "redux";
import cartReducer from "./cart/reducer";
import { persistReducer  } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const reducers = combineReducers({
    cart: cartReducer
});

const persistReducers = persistReducer(persistConfig, reducers);

export default persistReducers;

export type State = ReturnType<typeof persistReducers>



