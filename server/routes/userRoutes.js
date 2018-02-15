module.exports = function(app, db) {
  app.post('/getuser', (req, res) => {
    const collection = db.collection('users');
    collection.findOne({ username: req.body.username, password: req.body.password }, (err, items) => {
      let response;
      if (items !== null) {
        response = {
          userId: items._id,
          username: items.username,
          lastViewedMessage: items.lastViewedMessage
        };
      } else {
        response = {
          error: 'invalid data'
        };
      }
      res.send(response);
    });
  });
  app.post('/createuser', (req, res) => {
    const user = { username: req.body.username, password: req.body.password };
    const collection = db.collection('users');
    collection.insert(user, (err, result) => {
      if (err) {
        res.send({ error: 'user exists' });
      } else {
        res.send({ userId: result.ops[0]._id, username: result.ops[0].username });
      }
    });
  });
};
