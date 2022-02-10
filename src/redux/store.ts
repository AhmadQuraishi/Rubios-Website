import { applyMiddleware, createStore } from 'redux';
import persistReducers from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

const sagaMiddle = createSagaMiddleware();

const middleware = [sagaMiddle];

export const store = createStore(
  persistReducers,
  applyMiddleware(...middleware),
);

sagaMiddle.run(rootSaga);

export const persistor = persistStore(store);
