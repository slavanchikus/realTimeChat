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

export const getMeassages = (offset, username, roomId) => fetch(`${host}/getmessages/${offset}/user/${username}/room/${roomId}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const getOneMessage = (id, username, roomId) => fetch(`${host}/getmessage/${id}/user/${username}/room/${roomId}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createMessage = (content, userId, username, roomId) => fetch(`${host}/createmessage`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content, userId, username, roomId }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

/* export const createNewBackgroundSrc = (backgroundSrc, roomId) => fetch(`${host}/changebackground`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ backgroundSrc, roomId }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    }); */
