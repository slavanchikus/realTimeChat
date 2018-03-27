const host = 'http://localhost:8000';

export const uploadImg = data => fetch(`${host}/upload/img`, {
  method: 'POST',
  body: data,
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });
