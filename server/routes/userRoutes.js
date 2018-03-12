module.exports = function(app, db) {
  app.post('/getuser', (req, res) => {
    const usersCollection = db.collection('users');
    usersCollection.findOne({ username: req.body.username, password: req.body.password }, (userErr, userItems) => {
      let response;
      if (userItems !== null) {
        response = {
          user: {
            userId: userItems._id,
            username: userItems.username,
            lastViewedMessage: userItems.lastViewedMessage
          }
        };
        const roomsCollection = db.collection('rooms');
        roomsCollection.find({}).project({ password: 0 }).sort({ date: -1 })
              .toArray((roomErr, roomsArr) => {
                response.rooms = roomsArr;
                res.send(response);
              });
      } else {
        response = {
          error: 'invalid user data'
        };
        res.send(response);
      }
    });
  });

  app.post('/createuser', (req, res) => {
    const user = { username: req.body.username, password: req.body.password };
    const collection = db.collection('users');
    collection.insert(user, (err, result) => {
      if (err) {
        res.send({ error: 'user exists' });
      } else {
        res.send({ userId: result.ops[0]._id, username: result.ops[0].username });
      }
    });
  });
};
