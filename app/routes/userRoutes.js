module.exports = function(app, db) {
  app.get('/getuser', (req, res) => {
    const collection = db.collection('users');
    collection.find().toArray((err, items) => {
      res.send(items);
    });
  });
  app.post('/createuser', (req, res) => {
    const user = { username: req.body.username, password: req.body.password };
    const collection = db.collection('users');
    collection.insert(user, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
