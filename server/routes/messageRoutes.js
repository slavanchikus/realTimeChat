const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
  app.get('/getmessages/:offset/user/:user', (req, res) => {
    const messageCollection = db.collection('message');
    const offset = parseInt(req.params.offset, 10);
    messageCollection.find().skip(offset).sort({ date: -1 }).limit(18)
        .toArray((err, items) => {
          const revArr = items.reverse();
          res.send(revArr);
          if (offset === 0) {
            const usersCollection = db.collection('users');
            usersCollection.updateOne({ username: req.params.user }, { $set: { lastViewedMessage: revArr[revArr.length - 1].date }});
          }
        });
  });

  app.get('/getmessage/:id/user/:user', (req, res) => {
    const messageCollection = db.collection('message');
    messageCollection.findOne({ _id: new ObjectId(req.params.id) }, (err, item) => {
      let response;
      if (item !== null) {
        response = item;
        const usersCollection = db.collection('users');
        usersCollection.updateOne({ username: req.params.user }, { $set: { lastViewedMessage: response.date }});
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
        const usersCollection = db.collection('users');
        usersCollection.updateOne({ username: message.username }, { $set: { lastViewedMessage: message.date }});
      }
    });
  });
};
