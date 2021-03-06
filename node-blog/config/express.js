var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer= require('multer');
var upload = multer({dest: './public/images/blog'});
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var config = require('./config.json')[process.env.NODE_ENV || 'development'];
var db = require('monk')(config["MONGO_URI"]);
var moment = require('moment');
var index = require('../routes/index');
var posts = require('../routes/posts');
var categories = require('../routes/categories');

module.exports = function(app, currentDirectory){

  // Set moment globally
  app.locals.moment = moment;

  app.locals.truncateText = function(text, length){
    var truncatedText = text.substring(0, length);
    return truncatedText;
  }
  // view engine setup
  app.set('views', path.join(currentDirectory, 'views'));
  app.set('view engine', 'jade');


  // create a write stream (in append mode)
  var accessLogStream = fs.createWriteStream(path.join(currentDirectory, 'access.log'), {flags: 'a'})

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(currentDirectory, 'public', 'favicon.ico')));
  // app.use(logger('dev'));
  app.use(logger('combined', {stream: accessLogStream}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(currentDirectory, 'public')));

  // Make The db accesible to the router
  app.use((req,res,next) => {
    req.db = db;
    next();
  });

  // connect-flash with express messages
  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
      res.locals.messages = require('express-messages')(req, res);
      next();
    });

  // Express-validator
  app.use(expressValidator({}));

   //Handle Sessions
  app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));

  app.use('/', index);
  app.use('/posts', posts);
  app.use('/categories', categories);

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
