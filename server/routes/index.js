const roomsRouters = require('./roomsRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app, db) {
  roomsRouters(app, db);
  userRoutes(app, db);
};
