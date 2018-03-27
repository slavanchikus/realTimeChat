export const userRequest = (username, password) => ({
  type: 'USER_REQUEST',
  username,
  password
});

export const userCreate = (username, password) => ({
  type: 'USER_CREATE',
  username,
  password
});

export const getMessages = (offset, username, roomId) => ({
  type: 'MESSAGES_GET',
  offset,
  username,
  roomId
});

export const getOneMessage = (id, username, roomId) => ({
  type: 'ONE_MESSAGE_GET',
  id,
  username,
  roomId
});

export const createMessage = (content, files, userId, username, roomId) => ({
  type: 'MESSAGE_CREATE',
  content,
  files,
  userId,
  username,
  roomId
});

export const openRoom = (offset, username, roomId, password) => ({
  type: 'ROOM_OPEN',
  offset,
  username,
  roomId,
  password
});

export const createRoom = (roomName, description, password, userId) => ({
  type: 'ROOM_CREATE',
  roomName,
  description,
  password,
  userId
});

export const resetRoom = () => ({
  type: 'ROOM_RESET',
});

export const setRoomBackground = (backgroundSrc, roomId) => ({
  type: 'SET_ROOM_BACKGROUND',
  backgroundSrc,
  roomId
});

export const changeRoomBackground = (backgroundSrc, roomId) => ({
  type: 'CHANGE_ROOM_BACKGROUND',
  backgroundSrc,
  roomId
});

export const removeErrors = () => ({
  type: 'REMOVE_ERRORS'
});
