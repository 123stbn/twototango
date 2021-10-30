const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgaLogger = require('morgan');

const apiRouter = require('./routes/api')
const usersRouter = require('./routes/users');

var app = express();

app.use(morgaLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

module.exports = app;
