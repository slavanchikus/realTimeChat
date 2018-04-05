const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const socketEvents = require('./socketEvents');
const connectRoutes = require('./routes/index');
const db = require('./config/db');

const app = express();
const port = 8000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || port, () => {
  console.log(`We are live on ${port}`);
});

MongoClient.connect(db.url, (err, client) => {
  const dataBase = client.db('chat');
  connectRoutes(app, dataBase);
});

const io = require('socket.io').listen(server);

socketEvents(io);
