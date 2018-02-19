const initialState = {
  participants: {}
};

const handleParticipants = (messages, currentUsername, participants) => messages.reduce((sum, currentItem) => {
  const username = currentItem.username;
  if (!(username in participants) && username !== currentUsername) {
    sum[username] = {
      color: (`00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)
    };
  }
  return sum;
}, {});

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_CREATE_COMPLETE': {
      return { ...action.payload, participants: {}};
    }
    case 'USER_REQUEST_COMPLETE': {
      if (action.payload.error) {
        return { ...action.payload, participants: {}};
      }
      const currentUsername = action.payload.user.username;
      const participants = handleParticipants(action.payload.messages, currentUsername, state.participants);
      return { ...action.payload.user, participants };
    }
    case 'MESSAGES_GET_COMPLETE':
    case 'ONE_MESSAGE_GET_COMPLETE': {
      const currentUsername = state.username;
      const participants = handleParticipants(action.payload, currentUsername, state.participants);
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
