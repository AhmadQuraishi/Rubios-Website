import { applyMiddleware, createStore } from 'redux';
import persistReducers from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddle = createSagaMiddleware();
const middleware = [sagaMiddle];

<<<<<<< HEAD
const persistConfig = {
  key: 'RubiosWeb',
  storage: storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
=======
export const store = createStore(
  persistReducers,
>>>>>>> 5738f82e7545163620b2c2c470c64625248e6220
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddle.run(rootSaga);

export const persistor = persistStore(store);
