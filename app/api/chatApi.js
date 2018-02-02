const heroku = 'https://real-time-chat-slavanchikus.herokuapp.com';

export const getUser = (username, password) => fetch('http://localhost:8000/getuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createUser = (username, password) => fetch('http://localhost:8000/createuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getMeassages = offset => fetch(`http://localhost:8000/getmessages/${offset}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const getOneMessage = id => fetch(`http://localhost:8000/getmessage/${id}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createMessage = (content, userId, username) => fetch('http://localhost:8000/createmessage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content, userId, username }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });
