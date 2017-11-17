var express = require('express');
var router = express.Router();
var config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
var db = require('monk')(config["MONGO_URI"]);
var moment = require('moment');
var posts = db.get('posts');
var categories = db.get('categories');


router.get('/show/:category', function(req, res, next) {
	posts.find({category: req.params.category},{},function(err, posts){
		res.render('index',{
  			'title': req.params.category,
  			'posts': posts
  		});
	});
});

router.get('/add', function(req, res, next) {

    res.render('addcategory', {
      'title': 'Add Category'
    });
});

router.post('/add', function(req, res, next) {

  var name = req.body.name ;


  req.checkBody('name', 'title field is required').notEmpty();

   //check errors
  var errors = req.validationErrors();

  if(errors){
    console.log('errors');
    res.render('addpost', {errors: errors});
  }else{
    console.log('noerrors')
    categories.insert({
      name: name,
    }, function(err, post){
      if(err){
        res.send(err);
      }else{
        req.flash('Success', 'Category Added');
        res.location('/');
        res.redirect('/');
      }
    });
    }
});

module.exports = router;
