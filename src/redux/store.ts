import { applyMiddleware, createStore } from 'redux';
import persistReducers from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
const sagaMiddle = createSagaMiddleware();

const middleware = [sagaMiddle];

export const store = createStore(
  persistReducers,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddle.run(rootSaga);

export const persistor = persistStore(store);
