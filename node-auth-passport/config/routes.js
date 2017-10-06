var index = require('../controllers/index');
//var users = require('../controllers/users');

module.exports = function(app){
  app.get('/', ensureAuthenticated, index.landing);
  //app.use('/users', users);

}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

