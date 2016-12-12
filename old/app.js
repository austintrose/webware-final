// Libraries.
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

// Local JS code.
var routes = require('./routes/index');

// Set up objects.
var app = express();

// View engine setup.
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('views', path.join(__dirname, 'views'));
app.engine('html', nunjucks.render ) ;
app.set('view engine', 'html');

// Conf.
// TODO: Get a favicon.
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieSession({name: 'session', keys: ['key1', 'key2']}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler will print stacktrace.
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler no stacktraces leaked to user.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;