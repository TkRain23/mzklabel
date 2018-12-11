// Import npm modules and std:lib dependicies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Configure our dotene
require('dotenv').config();

// Import custom routes from routes folders
var authRouter = require("./routes/authentication")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// To instantiate the express app
var app = express();

// Creates the database connection
const dbConnection = require('./data/mzklabel-db.js');

// View engine setup (none atm)

// Register middleware before any requets hits our routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register custom routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
