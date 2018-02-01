export const getUser = (username, password) => fetch('https://real-time-chat-slavanchikus.herokuapp.com/getuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const createUser = (username, password) => fetch('https://real-time-chat-slavanchikus.herokuapp.com/createuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getMeassages = () => fetch('https://real-time-chat-slavanchikus.herokuapp.com/getmessages').then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const createMessage = (content, userId, username) => fetch('https://real-time-chat-slavanchikus.herokuapp.com/createmessage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content, userId, username }),
}).then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getMessage = id => fetch(`https://real-time-chat-slavanchikus.herokuapp.com/getmessages/${id}`).then(response => response.json())
    .catch((error) => {
      throw error;
    });
