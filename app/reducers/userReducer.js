const initialState = {};

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_CREATE_COMPLETE':
    case 'USER_REQUEST_COMPLETE': {
      return action.payload;
    }
    default:
      break;
  }
  return state;
}
