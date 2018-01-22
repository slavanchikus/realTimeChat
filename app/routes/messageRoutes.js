module.exports = function(app, db) {
  app.post('/message', (req, res) => {
    const message = { content: req.body.content, authorId: req.body.authorId };
    const collection = db.collection('message');
    collection.insert(message, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
