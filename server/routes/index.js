const roomsRouters = require('./roomsRoutes');
const messagesRouters = require('./messagesRoutes');
const userRoutes = require('./userRoutes');
const filesRoutes = require('./filesRoutes');

module.exports = function(app, db) {
  roomsRouters(app, db);
  messagesRouters(app, db);
  userRoutes(app, db);
  filesRoutes(app, db);
};
