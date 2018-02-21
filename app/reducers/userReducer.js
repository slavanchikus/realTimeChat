const initialState = {};

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_CREATE_COMPLETE': {
      return action.payload;
    }
    case 'USER_REQUEST_COMPLETE': {
      if (action.payload.error) {
        return action.payload;
      }
      return action.payload.user;
    }
    default:
      break;
  }
  return state;
}
