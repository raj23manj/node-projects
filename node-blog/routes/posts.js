var express = require('express');
var router = express.Router();
var multer= require('multer');
var upload = multer({dest: './public/images/blog'});
var config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
var db = require('monk')(config["MONGO_URI"]);
var moment = require('moment');
var posts = db.get('posts');
var categories = db.get('categories');

router.get('/add', function(req, res, next) {
  categories.find({}, {}, function(err, categories) {
    res.render('addpost', {
      'title': 'Add Post',
      'categories': categories
    });
  });
});

router.post('/add', upload.single('mainimage'),function(req, res, next) {

  var title = req.body.title ;
  var category = req.body.category ;
  var body = req.body.body ;
  var author = req.body.author;
  var date = new Date();

  if(req.file){
    var mainimage = req.file.filename
  } else {
    var mainimage = 'noimage.jpg'
  }

  req.checkBody('title', 'title field is required').notEmpty();
  req.checkBody('body', 'body field is required').notEmpty();

   //check errors
  var errors = req.validationErrors();

  if(errors){
    console.log('errors');
    res.render('addpost', {errors: errors});
  }else{
    console.log('noerrors')
    posts.insert({
      title: title,
      body: body,
      date: date,
      author: author,
      mainimage: mainimage,
      category: category
    }, function(err, post){
      if(err){
        res.send(err);
      }else{
        req.flash('Success', 'Post Added');
        res.location('/');
        res.redirect('/');
      }
    });
    }

});

module.exports = router;
