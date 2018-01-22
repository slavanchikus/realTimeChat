const messageRoutes = require('./messageRoutes');

module.exports = function(app, db) {
  messageRoutes(app, db);
};
