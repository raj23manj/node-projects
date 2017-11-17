var config = require('../config/config.json')['test'];
var db = require('monk')(config["MONGO_URI"]);

before(function(done) {
   // remove database data here
   db.then((db) => {
    db._db.dropDatabase()
  })
  done();
});

// https://github.com/Automattic/monk/issues/213

// https://stackoverflow.com/questions/16319463/cleaning-out-test-database-before-running-tests
