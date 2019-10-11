const request = require('supertest')
const mocha = require('mocha')
const chai = require('chai')
const describe = mocha.describe
const it = mocha.it
const expect = chai.expect

const app = require('./../src/app')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

describe('API', () => {
  it('Should return version number', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.version).to.be.ok
        expect(res.statusCode).to.equal(200)
        done()
      })
  })
})
