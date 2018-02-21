const initialState = [];

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ONE_MESSAGE_GET_COMPLETE': {
      return [...state, ...action.payload];
    }
    case 'MESSAGES_GET_COMPLETE': {
      return [...action.payload, ...state];
    }
    /* case 'USER_REQUEST_COMPLETE': {
      if (action.payload.error) {
        return state;
      }
      return [...action.payload.messages, ...state];
    } */
    case 'MESSAGE_CREATE_COMPLETE': {
      return [...state, action.payload];
    }
    default:
      break;
  }
  return state;
}
