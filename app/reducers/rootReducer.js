import { combineReducers } from 'redux';

import user from './userReducer';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import uiState from './uiStateReducer';
import errors from './errorsReducer';

const rootReducer = combineReducers({
  user,
  messages,
  rooms,
  uiState,
  errors
});

export default rootReducer;
