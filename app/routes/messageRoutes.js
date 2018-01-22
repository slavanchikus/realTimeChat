module.exports = function(app, db) {
  app.get('/getmessages', (req, res) => {
    const collection = db.collection('message');
    collection.find().toArray((err, items) => {
      res.send(items);
    });
  });
  app.post('/createmessage', (req, res) => {
    const message = { content: req.body.content, authorId: req.body.authorId };
    const collection = db.collection('message');
    collection.insert(message, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
