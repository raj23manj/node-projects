var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


exports.landing = function(req, res, next) {
  res.send('respond with a resource');
}

exports.register = function(req, res, next){
  res.render('register', {title: 'Register'});
}


exports.login = function(req, res, next) {
  res.render('login', {title: 'Login'});
}

exports.logout = function(req, res, next) {
  req.logout();
  req.flash('success', 'Logged out successfully');
  res.redirect('/users/login');
}

exports.login_submit = function(req, res, next) {
  
  // req._routeWhitelists.body = ['username', 'password']
  req.flash('success', 'You are now logged in');
  res.redirect('/');
}

exports.register_submit = function(req, res, next) {
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
}


// private functions

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done){
  // done is a calback
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      }else{
        return done(null, false, {message: 'Invalid Password'});
      }
    })
  });
}));