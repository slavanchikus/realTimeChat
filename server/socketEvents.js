module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('user connect');
    socket.on('join chat', () => {
      socket.emit('success', new Date());
    });

    socket.on('new message', () => {
      socket.broadcast.emit('fetch message');
    });
  });
};
