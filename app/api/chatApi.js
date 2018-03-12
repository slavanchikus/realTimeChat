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

export const getRooms = () => fetch(`${host}/getrooms`).then(response => response.json())
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

export const createBackgroundSrc = (backgroundSrc, roomId) => fetch(`${host}/room/changebackground`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ backgroundSrc, roomId }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const openRoom = (offset, username, roomId, password) => fetch(`${host}/getmessages/room`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ offset, username, roomId, password }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

export const createRoom = (roomName, description, password, userId) => fetch(`${host}/createroom`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ roomName, description, password, userId }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });
