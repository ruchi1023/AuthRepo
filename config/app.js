// Importing modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
var indexRouter = require('../route/index');
var userRouter = require('../route/user');
var contactRouter = require('../route/contact');
let flash = require('connect-flash');

let passport = require('passport');

// Instantiate Express
var app = express();
app.use(session({
  saveUninitialized: true,
resave: true,
  secret: "sessionSecret"
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, '../view'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use("/dashboard", contactRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error' + err);
});

module.exports = app;