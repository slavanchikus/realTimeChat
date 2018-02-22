const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
  app.get('/getrooms/:offset', (req, res) => {
    const collection = db.collection('rooms');
    const offset = parseInt(req.params.offset, 10);
    collection.find().skip(offset).sort({ date: -1 }).limit(18)
      .toArray((err, items) => {
        const revArr = items.reverse();
        res.send(revArr);
      });
  });

  app.get('/getmessages/:offset/user/:user/room/:roomId', (req, res) => {
    const roomCollection = db.collection(`room_${req.params.roomId}`);
    const offset = parseInt(req.params.offset, 10);
    roomCollection.find().skip(offset).sort({ date: -1 }).limit(18)
        .toArray((err, items) => {
          let arr = items;
          arr = items.reverse();
          res.send(arr);
          if (offset === 0 && arr.length > 0) {
            /* const usersCollection = db.collection('users');
            usersCollection.updateOne({ username: req.params.user }, { $set: { lastViewedMessage: arr[arr.length - 1].date }}); */
          }
        });
  });

  app.get('/getmessage/:id/user/:user/room/:roomId', (req, res) => {
    const roomCollection = db.collection(`room_${req.params.roomId}`);
    roomCollection.findOne({ _id: new ObjectId(req.params.id) }, (err, item) => {
      let response;
      if (item !== null) {
        response = item;
        /* const usersCollection = db.collection('users');
        usersCollection.updateOne({ username: req.params.user }, { $set: { lastViewedMessage: response.date }}); */
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
    const collection = db.collection(`room_${req.body.roomId}`);
    collection.insert(message, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
        /* const usersCollection = db.collection('users');
        usersCollection.updateOne({ username: message.username }, { $set: { lastViewedMessage: message.date }}); */
      }
    });
  });

  /* app.post('/room/changebackground', (req, res) => {
    const collection = db.collection('rooms');
    collection.updateOne({ _id: new ObjectId('5a8a9e1cf36d2866535eac1b') }, { $set: { backgroundSrc: req.body.backgroundSrc }});
    res.send({
      backgroundSrc: req.body.backgroundSrc
    });
  }); */
};
