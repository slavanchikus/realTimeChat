const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const connectRoutes = require('./app/routes');
const db = require('./app/config/db');

const app = express();
const port = 8000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

MongoClient.connect(db.url, (err, client) => {
  const dataBase = client.db('chat');
  connectRoutes(app, dataBase);

  app.listen(port, () => {
    console.log(`We are live on ${port}`);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
