const supertest = require('supertest')

var server = supertest.agent("http://localhost:5000")

describe("SAMPLE unit test", () => {
  if("should return home page", (done) => {
    server
      .get("/")
      .expect("Content-Type", /text/)
      .expect(200)
      .end(function (err, res) {
        done()
      });
  });
})