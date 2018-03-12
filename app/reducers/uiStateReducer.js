const initialState = {};

export default function uiStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE':
    case 'USER_REQUEST_ERROR':
    case 'ONE_MESSAGE_GET_COMPLETE':
    case 'MESSAGE_CREATE_COMPLETE':
    case 'MESSAGES_GET_COMPLETE': {
      return {
        isFetching: false,
      };
    }
    case 'USER_REQUEST':
    case 'ONE_MESSAGE_GET':
    case 'MESSAGE_CREATE':
    case 'MESSAGES_GET': {
      return {
        isFetching: true,
      };
    }
    default:
      break;
  }
  return state;
}
