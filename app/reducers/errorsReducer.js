const initialState = {};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_CREATE_ERROR':
    case 'USER_REQUEST_ERROR': {
      return {
        userError: action.payload.error
      };
    }
    case 'REMOVE_ERRORS': {
      return initialState;
    }
    default:
      break;
  }
  return state;
}
