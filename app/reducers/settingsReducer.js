const initialState = {};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      return { ...action.payload.settings };
    }
    default:
      break;
  }
  return state;
}
