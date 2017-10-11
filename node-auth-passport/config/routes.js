var index = require('../controllers/index');
var users = require('../controllers/users');
var passport_custom = require('../controllers/passport_custom');
var multer= require('multer');
var upload = multer({dest: './uploads'});



module.exports = function(app){
  // index route
  app.get('/', ensureAuthenticated, index.landing);

  // Users routes
  app.get('/users/', users.landing);
  app.get('/users/register', users.register);
  app.post('/users/register',  upload.single('profileimage'), users.register_submit);
  app.get('/users/login', users.login);
  app.post('/users/login', passport_custom.authenticate('/users/login', 'Invalid username or password'), users.login_submit);
  app.get('/users/logout', users.logout);

}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

