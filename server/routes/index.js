const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const settingsRoutes = require('./settingsRoutes');

module.exports = function(app, db) {
  messageRoutes(app, db);
  userRoutes(app, db);
  settingsRoutes(app, db);
};
