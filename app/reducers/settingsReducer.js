const initialState = {};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      return { ...action.payload.settings };
    }
    case 'CREATE_BACKGROUND_COMPLETE': {
      return action.payload;
    }
    case 'CHANGE_BACKGROUND': {
      return { backgroundSrc: action.backgroundSrc }
    }
    default:
      break;
  }
  return state;
}
