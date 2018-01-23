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
