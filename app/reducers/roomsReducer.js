const initialState = {};

const handleParticipants = (messages, participants = {}) => messages.reduce((sum, currentItem) => {
  const username = currentItem.username;
  if (!(username in participants)) {
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
    case 'ROOM_OPEN_COMPLETE': {
      const participants = handleParticipants(action.payload.messages, state.selectedRoom.participants);
      return {
        ...state,
        selectedRoom: {
          ...state.allRooms.find(item => item._id === action.payload.roomId),
          participants
        }
      };
    }
    case 'ROOM_RESET_COMPLETE': {
      return {
        allRooms: action.payload,
        selectedRoom: {}
      };
    }
    case 'ROOM_CREATE_COMPLETE': {
      return {
        ...state,
        allRooms: [...state.allRooms, action.payload]
      };
    }
    case 'MESSAGES_GET_COMPLETE':
    case 'ONE_MESSAGE_GET_COMPLETE': {
      const participants = handleParticipants(action.payload, state.selectedRoom.participants);
      if (Object.keys(participants).length > 0) {
        return { ...state,
          selectedRoom: {
            ...state.selectedRoom,
            participants: {
              ...state.selectedRoom.participants,
              ...participants
            }
          }};
      }
      return state;
    }
    case 'SET_ROOM_BACKGROUND_COMPLETE': {
      return {
        ...state,
        selectedRoom: {
          ...state.selectedRoom,
          backgroundSrc: action.payload.backgroundSrc
        }
      };
    }
    case 'CHANGE_ROOM_BACKGROUND': {
      return {
        ...state,
        selectedRoom: {
          ...state.selectedRoom,
          backgroundSrc: action.backgroundSrc
        }
      };
    }
    default:
      break;
  }
  return state;
}
