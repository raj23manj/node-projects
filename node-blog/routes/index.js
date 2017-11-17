var express = require('express');
var router = express.Router();
var config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
var db = require('monk')(config["MONGO_URI"]);

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var posts = db.get('posts');

  posts.find({}, {}, (err, posts) => {
    res.render('index', { posts: posts });
  });
});

module.exports = router;
