const initialState = [];

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'MESSAGES_GET_COMPLETE': {
      return [...state, ...action.payload];
    }
    case 'MESSAGE_CREATE_COMPLETE': {
      return [...state, action.payload];
    }
    default:
      break;
  }
  return state;
}
