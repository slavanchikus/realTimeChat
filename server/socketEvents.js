module.exports = function(io) {
  let clients = [];
  io.on('connection', (socket) => {
    socket.on('join chat', (userId) => {
      clients.push(userId);
      io.sockets.emit('user connect', clients);
    });

    socket.on('quit chat', (userId) => {
      clients = clients.filter(item => item !== userId);
      socket.broadcast.emit('user disconnect', clients);
    });

    socket.on('new message', (id) => {
      socket.broadcast.emit('fetch message', id);
    });
  });
};
