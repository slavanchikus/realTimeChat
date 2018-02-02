const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
  app.get('/getmessages/:offset', (req, res) => {
    const collection = db.collection('message');
    const offset = parseInt(req.params.offset, 10);
    collection.find().skip(offset).sort({ date: -1 }).limit(12)
        .toArray((err, items) => {
          res.send(items.reverse());
        });
  });
  app.get('/getmessage/:id', (req, res) => {
    const collection = db.collection('message');
    collection.findOne({ _id: new ObjectId(req.params.id) }, (err, items) => {
      let response;
      if (items !== null) {
        response = items;
      } else {
        response = {
          error: 'invalid data'
        };
      }
      res.send([response]);
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
