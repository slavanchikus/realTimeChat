module.exports = function(io) {
  let online = [];
  let typing = [];
  io.on('connection', (socket) => {
    socket.on('join chat', (username) => {
      if (!online.includes(username)) online.push(username);
      io.sockets.emit('user connect', online);
    });

    socket.on('quit chat', (username) => {
      online = online.filter(item => item !== username);
      socket.broadcast.emit('user disconnect', online);
    });

    socket.on('start typing', (username) => {
      if (!typing.includes(username)) typing.push(username);
      socket.broadcast.emit('user typing', typing);
    });

    socket.on('stop typing', (username) => {
      typing = typing.filter(item => item !== username);
      socket.broadcast.emit('user stop typing', typing);
    });

    socket.on('new message', (id) => {
      socket.broadcast.emit('fetch message', id);
    });
  });
};
