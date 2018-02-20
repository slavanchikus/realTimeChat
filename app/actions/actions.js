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

export const getMessages = (offset, username) => ({
  type: 'MESSAGES_GET',
  offset,
  username
});

export const getOneMessage = (id, username) => ({
  type: 'ONE_MESSAGE_GET',
  id,
  username
});

export const createMessage = (content, userId, username) => ({
  type: 'MESSAGE_CREATE',
  content,
  userId,
  username
});

export const createBackgroundSrc = backgroundSrc => ({
  type: 'CREATE_BACKGROUND',
  backgroundSrc
});

export const changeBackgroundSrc = backgroundSrc => ({
  type: 'CHANGE_BACKGROUND',
  backgroundSrc
});
