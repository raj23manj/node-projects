const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");

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

  it("should post a register", (done) => {
    request(app).post("/users/register").end((err, res) => {
      
    });
  });

});