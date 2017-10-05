var express = require('express');
var router = express.Router();

var multer= require('multer');
var upload = multer({dest: './uploads'});

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var confirmpassword = req.body.confirmpassword;

  if(req.file){
    console.log('uploading ...');
    var profileimage = req.file.filename;
  }else {
    console.log('No uploading ...');
    var profileimage = 'noimage.jpeg';
  }

  // form validator

  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Not Valid Email').isEmail();
  req.checkBody('username', 'UserName field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('confirmpassword', 'Passwords Do Not Match').equals(req.body.confirmpassword);

  //check errors
  var errors = req.validationErrors();

  if(errors){
    console.log('errors');
    res.render('register', {errors: errors});
  }else{
    console.log('noerrors')
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });

    User.createUser(newUser,function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'you are now registered and can login!');
    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;
