const host = 'http://localhost:8000';

export const uploadImg = data => fetch(`${host}/upload/img`, {
  method: 'POST',
  body: data,
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

export const deleteImg = path => fetch(`${host}/delete/img`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ path }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

