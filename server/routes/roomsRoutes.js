const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
  app.get('/getrooms', (req, res) => {
    const roomsCollection = db.collection('rooms');
    roomsCollection.find({}).project({ password: 0 }).sort({ date: -1 })
      .toArray((roomErr, roomsArr) => {
        res.send(roomsArr);
      });
  });

  app.post('/room/setbackground', (req, res) => {
    const collection = db.collection('rooms');
    collection.updateOne({ _id: new ObjectId(req.body.roomId) }, { $set: { backgroundSrc: req.body.backgroundSrc }});
    res.send({
      backgroundSrc: req.body.backgroundSrc
    });
  });

  app.post('/createroom', (req, res) => {
    const room = {
      roomName: req.body.roomName,
      description: req.body.description,
      password: req.body.password,
      participants: [],
      backgroundSrc: '',
      userId: req.body.userId,
      isPrivate: req.body.password.length > 0
    };
    const collection = db.collection('rooms');
    collection.insert(room, (err, result) => {
      if (err) {
        res.send({ error: 'room exists' });
      } else {
        db.createCollection(`room_${result.ops[0]._id}`, (dbErr, dbRes) => {
          res.send(result.ops[0]);
        });
      }
    });
  });
};
