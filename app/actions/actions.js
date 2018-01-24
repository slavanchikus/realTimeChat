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

export const getMessages = () => ({
  type: 'MESSAGES_GET',
});

export const createMessage = (content, userId, username) => ({
  type: 'MESSAGE_CREATE',
  content,
  userId,
  username
});
