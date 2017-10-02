const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");



describe("Basic Website App Routes", function() {

  it("Should Load the root page", (done) => {
      request(app).get("/").end((err, res) =>{
          expect(res.status).to.equal(200);
          console.log(res.body);
          //expect(res.body.title).to.equal('Welcome');
          done();
      });
  });

});