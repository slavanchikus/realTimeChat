module.exports = function(app, db) {
  app.post('/getuser', (req, res) => {
    console.log(req);
    const collection = db.collection('users');
    collection.findOne({ username: req.body.username, password: req.body.password }, (err, items) => {
      let response;
      if (items !== null) {
        response = { ...items, success: true };
        res.send(response);
      }
      response = { success: false };
      res.send(response);
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
