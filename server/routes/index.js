const roomsRouters = require('./roomsRoutes');
const messagesRouters = require('./messagesRoutes');
const userRoutes = require('./userRoutes');
const uploadRoutes = require('./uploadRoutes');

module.exports = function(app, db) {
  roomsRouters(app, db);
  messagesRouters(app, db);
  userRoutes(app, db);
  uploadRoutes(app, db);
};
