module.exports = function(io) {
  io.on('connection', (socket) => {
    let room = null;

    socket.on('join chat', (username, roomId) => {
      room = roomId;
      socket.join(room);

      const clients = io.sockets.adapter.rooms[room].sockets;

      io.sockets.in(room).emit('user connect', Object.keys(clients).length);
    });

    socket.on('quit chat', () => {
      socket.leave(room);
      socket.broadcast.to(room).emit('user disconnect');
    });

    socket.on('start typing', (username) => {
      socket.broadcast.to(room).emit('user typing', username);
    });

    socket.on('stop typing', () => {
      socket.broadcast.to(room).emit('user stop typing');
    });

    socket.on('new message', (id) => {
      socket.broadcast.to(room).emit('fetch message', id);
    });

    socket.on('new background', (backgroundSrc) => {
      socket.broadcast.to(room).emit('change background', backgroundSrc);
    });
  });
};
