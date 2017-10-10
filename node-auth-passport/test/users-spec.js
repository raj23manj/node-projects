const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");
//const User = require('../models/user');

describe("Users Routes", () => {

  it("should Load User's Root Page and have a response", (done) => {
    request(app).get('/users/').expect(200).end((err, res) =>{
      expect(res.text).to.equal("respond with a resource");
      done();
    });
  });

  it("Should Load the User Register Page", (done) => {
      request(app).get("/users/register").end((err, res) =>{
          expect(res.status).to.equal(200);
          done();
      });
  });

  it("should have header as register", (done) => {
    request(app).get("/users/register").end((err, res) =>{
          let $ = cheerio.load(res.text);
          let pageHeading = $("body div.container h2.page-header").text();
          expect(pageHeading).to.equal("Register");
          done();
      });
  });

// wrong implementation it will be success only
  // it("should post a register", (done) => {
  //   request(app).post("/users/register")
  //               .field('username', 'a')
  //               .field('password', '1234')
  //               .expect(200)
  //               .end((err, res) => {
  //                 done();
  //   });
  // });

  it("should  login", (done) => {
    request(app).post("/users/login")
                .send({
                        username: 'a',
                        password: '1234'
                      })
                .expect('Location', '/')
                .end(done);
  });

  it("should  login23", (done) => {
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