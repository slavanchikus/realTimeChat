const initialState = [];

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ONE_MESSAGE_GET_COMPLETE': {
      return [...state, ...action.payload];
    }
    case 'MESSAGES_GET_COMPLETE': {
      return [...action.payload, ...state];
    }
    case 'MESSAGE_CREATE_COMPLETE': {
      return [...state, action.payload];
    }
    case 'ROOM_OPEN_COMPLETE': {
      return [...action.payload.messages, ...state];
    }
    case 'ROOM_RESET_COMPLETE': {
      return initialState;
    }
    default:
      break;
  }
  return state;
}
