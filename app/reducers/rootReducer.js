import { combineReducers } from 'redux';

import user from './userReducer';
import messages from './messagesReducer';

const rootReducer = combineReducers({
  user,
  messages
});

export default rootReducer;
