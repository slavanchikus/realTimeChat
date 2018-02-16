const host = 'http://localhost:8000';
/* http://localhost:8000 */

export const getUser = (username, password) => fetch(`${host}/getuser`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createUser = (username, password) => fetch(`${host}/createuser`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getMeassages = (offset, username) => fetch(`${host}/getmessages/${offset}/user/${username}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const getOneMessage = (id, username) => fetch(`${host}/getmessage/${id}/user/${username}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createMessage = (content, userId, username) => fetch(`${host}/createmessage`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content, userId, username }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });
