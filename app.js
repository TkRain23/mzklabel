// import npm modules and std lib dependicies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// configure our dotenv
require('dotenv').config();

// import custom routes from routes folders
var authRouter = require("./routes/authentication")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// to instantiate the express app
var app = express();

// import authentication middleware
const authentication = require("./lib/authenticate");

// creates the database connection
const dbConnection = require('./data/mzklabel-db.js');

// view engine setup (none atm)

// Register middleware before any requets hits our routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authenticate);

// Register custom routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
