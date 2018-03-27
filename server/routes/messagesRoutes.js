const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
  app.get('/getmessages/:offset/user/:user/room/:roomId', (req, res) => {
    const roomCollection = db.collection(`room_${req.params.roomId}`);
    const offset = parseInt(req.params.offset, 10);
    roomCollection.find().skip(offset).sort({ date: -1 }).limit(24)
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

  app.post('/getmessages/room', (req, res) => {
    const roomsCollection = db.collection('rooms');
    roomsCollection.findOne({ _id: new ObjectId(req.body.roomId), password: req.body.password }, (roomsErr, roomsItems) => {
      let response;
      if (roomsItems !== null) {
        const roomCollection = db.collection(`room_${req.body.roomId}`);
        const offset = parseInt(req.params.offset, 10);
        roomCollection.find().skip(offset).sort({ date: -1 }).limit(24)
          .toArray((err, items) => {
            response = {
              roomId: req.body.roomId,
              messages: items.reverse()
            };
            res.send(response);
            /* const usersCollection = db.collection('users');
             usersCollection.updateOne({ username: message.username }, { $set: { lastViewedMessage: message.date }}); */
          });
      } else {
        response = {
          error: 'invalid room data'
        };
        res.send(response);
      }
    });
  });

  app.post('/createmessage', (req, res) => {
    const message = {
      content: req.body.content,
      files: req.body.files,
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
};
