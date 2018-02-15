const heroku = 'https://real-time-chat-slavanchikus.herokuapp.com';
/* https://real-time-chat-slavanchikus.herokuapp.com */
/* http://localhost:8000 */

export const getUser = (username, password) => fetch(`${heroku}/getuser`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createUser = (username, password) => fetch(`${heroku}/createuser`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getMeassages = (offset, username) => fetch(`${heroku}/getmessages/${offset}/user/${username}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const getOneMessage = (id, username) => fetch(`${heroku}/getmessage/${id}/user/${username}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createMessage = (content, userId, username) => fetch(`${heroku}/createmessage`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content, userId, username }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });
