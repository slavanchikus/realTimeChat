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

export const getMessages = offset => ({
  type: 'MESSAGES_GET',
  offset
});

export const getOneMessage = id => ({
  type: 'ONE_MESSAGE_GET',
  id,
});

export const createMessage = (content, userId, username) => ({
  type: 'MESSAGE_CREATE',
  content,
  userId,
  username
});
