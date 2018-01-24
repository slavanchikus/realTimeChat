module.exports = function(app, db) {
  app.get('/getmessages', (req, res) => {
    const collection = db.collection('message');
    collection.find().toArray((err, items) => {
      const messages = items.sort((a, b) => b.date - a.date);
      res.send(messages);
    });
  });
  app.post('/createmessage', (req, res) => {
    const message = {
      content: req.body.content,
      userId: req.body.userId,
      username: req.body.username,
      date: Date.now()
    };
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
