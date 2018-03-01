import { combineReducers } from 'redux';

import user from './userReducer';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import uiState from './uiStateReducer';

const rootReducer = combineReducers({
  user,
  messages,
  rooms,
  uiState
});

export default rootReducer;
