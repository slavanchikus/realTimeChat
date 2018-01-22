const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const connectRoutes = require('./app/routes');
const db = require('./app/config/db');

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, client) => {
  const dataBase = client.db('chat');
  connectRoutes(app, dataBase);
  app.listen(port, () => {
    console.log(`We are live on ${port}`);
  });
});
