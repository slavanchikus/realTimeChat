const roomsRouters = require('./roomsRoutes');
const messagesRouters = require('./messagesRoutes');
const userRoutes = require('./userRoutes');
const filesRoutes = require('./filesRoutes');
const audioRoutes = require('./audioRoutes');

module.exports = function(app, db) {
  roomsRouters(app, db);
  messagesRouters(app, db);
  userRoutes(app, db);
  filesRoutes(app, db);
  audioRoutes(app, db);
};
