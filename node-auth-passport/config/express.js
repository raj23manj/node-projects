var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').strategy;
var multer= require('multer');
var upload = multer({dest: './uploads'});
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var winston = require('winston'),
    expressWinston = require('express-winston');

module.exports = function(app, currentDirectory, pry) {
    // view engine setup
  app.set('views', path.join(currentDirectory, 'views'));
  app.set('view engine', 'jade');


  //Handle Sessions
  app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // validator
  app.use(expressValidator({}));

  // express-messages/connect-flash
  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

  // to set global loggedin user
  app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(currentDirectory, 'public')));
  
  expressWinston.requestWhitelist.push('body');
  //expressWinston.responseWhitelist.push('body');

  app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ],
      meta: true, // optional: control whether you want to log the meta data about the request (default to true) 
      msg: "HTTP {{req.method}} {{req.url}} {{req.body}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}" 
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true 
      colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red). 
      ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response 
    }));

  app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));

  // app.use(express.errorLogger({
  //     dumpExceptions: true,
  //     showStack: true
  //   }));

  // require all the routes
  require('../config/routes')(app);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};