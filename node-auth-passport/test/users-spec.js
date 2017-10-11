const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");
var User = require('../models/user');

describe("Users Routes", () => {

  it("should Get /users/", (done) => {
    request(app).get('/users/').expect(200).end((err, res) =>{
      expect(res.text).to.equal("respond with a resource");
      done();
    });
  });

  it("Should GET /users/register", (done) => {
      request(app).get("/users/register").end((err, res) =>{
          expect(res.status).to.equal(200);
          done();
      });
  });

  it("should Get /users/register Test HEader", (done) => {
    request(app).get("/users/register").end((err, res) =>{
          let $ = cheerio.load(res.text);
          let pageHeading = $("body div.container h2.page-header").text();
          expect(pageHeading).to.equal("Register");
          done();
      });
  });

  it("should POST /users/login login", (done) => {
    request(app).post("/users/login")
                .send({
                        username: 'a',
                        password: '1234'
                      })
                .expect('Location', '/')
                .end(done);
  });

  it("should POST /users/login login for testing text", (done) => {
    // while redirecting no text is coming need to check it again
    request(app).post("/users/login")
                .send({
                        username: 'a',
                        password: '1234'
                      })
                .end((err, res) => {
                  console.log('@@@@@@@@@@@@@@@@');
                  console.log(res.text);
                  done();
                });
  });

});

describe("Register", () => {
  it("Should POST /users/register, successful", done => {
      request(app).post('/users/register')
                  .send({
                          name: "mocha23",
                          email: "mocha23@gmail.com",
                          username: "mocha23",
                          password: "qwerty",
                          confirmpassword: "qwerty"
                  }).expect('Location', '/').end(done);
  });

  after(function(done) {
      User.remove_by_username("mocha23", (err) => {});
      done();
    });
});


// https://stackoverflow.com/questions/20164478/unit-test-login-with-passport-js-and-express-js
// describe('User', function () {
//   before(function(done) {
//       user = new User({
//         email    : "user@user.com",
//         firstName: "Full Name",
//         lastName : "Last Name",
//         password : "pass11"
//       });
//       user.save(done)
//     });
//   describe('Login test', function () {
//       it('should redirect to /', function (done) {
//         agent
//         .post('/users/session')
//         .field('email', 'user@user.com')
//         .field('password', 'pass11')
//         .expect('Location','/')
//         .end(done)
//       })

//   after(function(done) {
//       User.remove().exec();
//       return done();
//     });

// })
// })