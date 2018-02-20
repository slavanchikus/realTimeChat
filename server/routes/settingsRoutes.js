const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
  app.post('/changebackground', (req, res) => {
    const collection = db.collection('settings');
    collection.updateOne({ _id: new ObjectId('5a8a9e1cf36d2866535eac1b') }, { $set: { backgroundSrc: req.body.backgroundSrc }});
    res.send({
      backgroundSrc: req.body.backgroundSrc
    });
  });
};
