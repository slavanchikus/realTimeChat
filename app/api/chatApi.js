const heroku = 'https://real-time-chat-slavanchikus.herokuapp.com';

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

export const getMeassages = offset => fetch(`${heroku}/getmessages/${offset}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const getOneMessage = id => fetch(`${heroku}/getmessage/${id}`).then(response => response.json())
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
