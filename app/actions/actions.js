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

export const createMessage = (content, userId, username, roomId) => ({
  type: 'MESSAGE_CREATE',
  content,
  userId,
  username,
  roomId
});

export const selectRoom = roomId => ({
  type: 'ROOM_SELECT',
  roomId,
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

export const createBackgroundSrc = (backgroundSrc, roomId) => ({
  type: 'CREATE_BACKGROUND',
  backgroundSrc,
  roomId
});

export const changeBackgroundSrc = (backgroundSrc, roomId) => ({
  type: 'CHANGE_BACKGROUND',
  backgroundSrc,
  roomId
});

export const removeErrors = () => ({
  type: 'REMOVE_ERRORS'
});
