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

export const getMeassages = () => fetch('http://localhost:8000/getmessages').then(response => response.json())
    .catch((error) => {
      throw error;
    });
