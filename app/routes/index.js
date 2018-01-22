const messageRoutes = require('./messageRoutes');

module.exports = function(app, db) {
  messageRoutes(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};
