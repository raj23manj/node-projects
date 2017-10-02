const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");



describe("Basic Website App Routes", () => {

  it("Should Load the root page", (done) => {
      request(app).get("/").end((err, res) =>{
          expect(res.status).to.equal(200);
          console.log(res.body);
          //expect(res.body.title).to.equal('Welcome');
          done();
      });
  });

  it("Should Load the /about page", (done) => {
      request(app).get("/about").end((err, res) =>{
          expect(res.status).to.equal(200);
          done();
      });
  });

  it("Should Load the /about page", (done) => {
      request(app).get("/contact").end((err, res) =>{
          expect(res.status).to.equal(200);
          done();
      });
  });

});