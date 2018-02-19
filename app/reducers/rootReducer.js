import { combineReducers } from 'redux';

import user from './userReducer';
import messages from './messagesReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  user,
  messages,
  settings
});

export default rootReducer;
