import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddle = createSagaMiddleware();

const middleware = [sagaMiddle];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddle.run(rootSaga);

export default store;
