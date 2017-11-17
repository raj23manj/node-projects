const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");
require('./globalBefore')

describe("Categories Routes", () => {
  it("should Get '/categories/show/:category'", (done) => {
    request(app).get('/categories/show/Technology').expect(200).end((err, res) =>{
      let $ = cheerio.load(res.text);
      let divs = $("body").find('div.post').length;
      expect(divs).to.equal(0);
      done();
    });
  });
});
