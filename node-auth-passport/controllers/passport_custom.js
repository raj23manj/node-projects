var passport = require('passport');

exports.authenticate = function(path, msg){
  return passport.authenticate('local', {failureRedirect: path, failureFlash: msg});
}