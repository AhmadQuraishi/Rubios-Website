import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddle = createSagaMiddleware();

const middleware = [sagaMiddle];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddle.run(rootSaga);

export default store;
