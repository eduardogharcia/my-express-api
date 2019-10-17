const User = require('./../models/User')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ClientError = require('../helpers/ClientError')

async function createNewSessionByEmailAndPassword (email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new ClientError('User invalid')
  }

  const validPassword = await bcript.compare(password, user.password)
  if (!validPassword) {
    throw new ClientError('Invalid password')
  }

  // create token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET)
  return token
}

async function deleteSessionById () {
  return 'logout'
}

module.exports = {
  createNewSessionByEmailAndPassword,
  deleteSessionById
}
