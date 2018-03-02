const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const config = require('./configuration/database');

mongoose.connect(config.database, { useMongoClient: true});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});


// if (process.env.NODE_ENV === 'test') {
//   mongoose.connect('mongodb://localhost/APIAuthenticationTEST', { useMongoClient: true });
// } else {
//   mongoose.connect('mongodb://localhost/APIAuthentication', { useMongoClient: true });
// }

const app = express();

// Middlewares moved morgan into if for clear tests

  app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true})); // changed


app.use(bodyParser.json());

// Routes
app.get('/', function(req, res, next) {
	
	res.send("ravi");
});
app.use('/users', require('./routes/users'));
module.exports = app;
