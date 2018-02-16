const initialState = {};

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_CREATE_COMPLETE':
    case 'USER_REQUEST_COMPLETE': {
      return { ...action.payload, participants: {}};
    }
    case 'MESSAGES_GET_COMPLETE':
    case 'ONE_MESSAGE_GET_COMPLETE': {
      const currentUsername = state.username;
      const participants = action.payload.reduce((sum, currentItem) => {
        const username = currentItem.username;
        if (!(username in state.participants) && username !== currentUsername) {
          sum[username] = {
            color: (`00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)
          };
        }
        return sum;
      }, {});
      if (Object.keys(participants).length > 0) {
        return { ...state,
          participants: {
            ...state.participants,
            ...participants
          }};
      }
      return state;
    }
    default:
      break;
  }
  return state;
}
