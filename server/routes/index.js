const roomsRouters = require('./roomsRoutes');
const userRoutes = require('./userRoutes');
const uploadRoutes = require('./uploadRoutes');

module.exports = function(app, db) {
  roomsRouters(app, db);
  userRoutes(app, db);
  uploadRoutes(app, db);
};
