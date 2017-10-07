const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
//const agent = request.agent(app);
const cheerio = require("cheerio");

describe("Users Routes", () => {

  it("Should Load the User Register Page", (done) => {
      request(app).get("/users/register").end((err, res) =>{
          console.log(res.body);
          expect(res.status).to.equal(200);
          done();
      });
  });

});