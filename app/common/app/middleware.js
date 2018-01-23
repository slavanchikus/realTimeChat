import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export const middleware = ((middlewares) => {
  if (process.env.NODE_ENV !== 'production') {
        /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      return compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }
  return applyMiddleware(...middlewares);
})([
  sagaMiddleware
]);
