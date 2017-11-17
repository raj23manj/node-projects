const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");
// if using test db uncommen this
//require('./globalBefore')
describe("Categories Routes", () => {
  it("should Get '/categories/show/:category'", (done) => {
    request(app).get('/categories/show/Technology').expect(200).end((err, res) =>{
      let $ = cheerio.load(res.text);
      let divs = $("body").find('div.post').length;
      expect(divs).to.equal(2);
      done();
    });
  });

  it("should get /categories/add", (done) => {
    request(app).get('/categories/add').expect(200).end((err, res) => {
      let $ = cheerio.load(res.text);
      let text = $("body").find('div.container h1').text();
      expect(text).to.equal('Add Category');
      done();
    });
  });

  it("should POST /categories/add", (done) => {
    request(app).post("/categories/add")
                .send({
                        name: ''
                      })
                .end((err, res) => {
                  let $ = cheerio.load(res.text);
                  let size = $("body").find('.errors').children().length;
                  expect(size).to.equal(1);
                  done();
                });
  });

  it("should POST /categories/add", (done) => {
    request(app).post("/categories/add")
                .send({
                        name: 'Testing23'
                      })
                      .expect('Location', '/')
                      .end(done);
  });

});
