import { createStore } from 'redux';
import { sagaMiddleware, middleware } from '../common/app/middleware';

import sagas from '../sagas';
import rootReducer from './rootReducer';

export const store = createStore(rootReducer, middleware);

sagaMiddleware.run(sagas);