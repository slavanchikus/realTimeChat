const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app, db) {
  messageRoutes(app, db);
  userRoutes(app, db);
};
