const initialState = {};

const handleParticipants = (messages, currentUsername, participants = {}) => messages.reduce((sum, currentItem) => {
  const username = currentItem.username;
  if (!(username in participants) && username !== currentUsername) {
    sum[username] = {
      color: (`00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)
    };
  }
  return sum;
}, {});

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      return {
        allRooms: action.payload.rooms,
        selectedRoom: {}
      };
    }
    case 'MESSAGES_GET_COMPLETE':
    case 'ONE_MESSAGE_GET_COMPLETE': {
      const currentUsername = state.username;
      const participants = handleParticipants(action.payload, currentUsername, state.selectedRoom.participants);
      if (Object.keys(participants).length > 0) {
        return { ...state,
          selectedRoom: {
            participants: {
              ...state.participants,
              ...participants
            }
          }};
      }
      return state;
    }
    /* case 'CREATE_BACKGROUND_COMPLETE': {
      return action.payload;
    }
    case 'CHANGE_BACKGROUND': {
      return { backgroundSrc: action.backgroundSrc };
    } */
    default:
      break;
  }
  return state;
}
