require('./database');
var express = require('express');
var swig = require('swig');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var session = require('client-sessions');

// User model for middleware
var mongoose = require('mongoose');
var User = mongoose.model('users');

// routes define
var api = require('./routes/api');
var admin = require('./routes/admin');
var posts = require('./routes/posts');
var music = require('./routes/music');
var projects = require('./routes/projects');
var about = require('./routes/about');
var index = require('./routes/index');

var app = express();

// view engine setup
var swig = new swig.Swig();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session middleware for User cookie
app.use(session({
  cookieName: 'session',
  secret: 'asdflsakwelasfkwieofuwoir82ldsfw22r23fwelfwif29203fsfaigpoig90092rowi',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// session middleware for User instance
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({name: req.session.user.name}, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
        res.locals.user = req.user;
      }
      next();
    });
  } else {
    next();
  }
});

// routes initialize
app.use('/', index);
app.use('/api', api);
app.use('/admin', admin);
app.use('/posts/', posts);
app.use('/music/', music);
app.use('/projects/', projects);
app.use('/about/', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
