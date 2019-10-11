const request = require('supertest')
const mocha = require('mocha')
const chai = require('chai')
const describe = mocha.describe
const it = mocha.it
const before = mocha.before
const after = mocha.after
const expect = chai.expect

const app = require('./../src/app')
const mongoose = require('mongoose')

const testDB = 'mongodb://localhost:27017/xofer-test'

// const User = require('../src/models/User')

mongoose.connect(testDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

describe('API', () => {
  it('Should return version number', async () => {
    const res = await request(app).get('/')

    expect(res.statusCode).to.equal(200)
    expect(res.body.version).to.be.ok
  })
})

const fakeUser = {
  name: 'Eduardo',
  email: 'eduardo@eduardo.com',
  password: '123456'
}

describe('Account', () => {
  before(async () => {
    // await User.deleteMany()
    await mongoose.connection.dropDatabase()
  })

  after(async () => {
    await mongoose.connection.dropDatabase()
  })

  it('Should return created account', async () => {
    const res = await request(app).post('/account').send(fakeUser)

    expect(res.statusCode).to.equal(201)
    expect(res.body.name).to.be.ok
    expect(res.body.name).to.equal('Eduardo')
    expect(res.body.email).to.equal('eduardo@eduardo.com')
  })

  it('Should not create user width an e-mail that already exists in another user', async () => {
    const res = await request(app).post('/account')
      .send({
        ...fakeUser,
        name: 'Outro nome',
        password: 'mytheforce'
      })

    expect(res.statusCode).to.equal(400)
  })
})
