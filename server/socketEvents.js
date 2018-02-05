module.exports = function(io) {
  let clients = [];
  io.on('connection', (socket) => {
    socket.on('join chat', (username) => {
      clients.push(username);
      io.sockets.emit('user connect', clients);
    });

    socket.on('quit chat', (username) => {
      clients = clients.filter(item => item !== username);
      socket.broadcast.emit('user disconnect', clients);
    });

    socket.on('new message', (id) => {
      socket.broadcast.emit('fetch message', id);
    });
  });
};
