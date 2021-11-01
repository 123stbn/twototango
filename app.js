const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgaLogger = require('morgan');

const apiRouter = require('./routes/api')
const usersRouter = require('./routes/users');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
