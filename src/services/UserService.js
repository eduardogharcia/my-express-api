const User = require('./../models/User')
const bcript = require('bcryptjs')

const ClientError = require('../helpers/ClientError')

/**
 * @param {String} id User id
 * @return User model
 */
const getUserById = async (id) => {
  return User.findOne({ _id: id }).select('-password')
}

/**
 *
 * @param {String} email Email address of the user
 * @return User model
 */
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select('-password')
  return user
}

/**
 *
 * @param {Object} userData
 * @return User model just created
 */
const saveNewUser = async (userData) => {
  const userAlreadyExists = await getUserByEmail(userData.email)

  if (userAlreadyExists) {
    throw new ClientError('User already exists')
  }

  // hash password
  userData.password = await hashPassword(userData.password)

  const user = new User({
    ...userData,
    password: userData.password
  })

  return user.save()
}

/**
 *
 * @param {String} password
 * @return Password hashed to store
 */
const hashPassword = async (password) => {
  const salt = await bcript.genSalt(10)
  return bcript.hash(password, salt)
}

/**
 *
 * @param {String} id Id of a user
 * @param {Object} userData All user information
 * @return User object just updated
 */
const updateUserById = async (id, userData) => {
  const user = await getUserByEmail(id)

  if (!user) {
    throw new ClientError('User not exists')
  }
  userData.email = user.email // preventing change e-mail
  userData.password = await hashPassword(userData.password)
  user.save()
}

module.exports = {
  getUserById,
  getUserByEmail,
  saveNewUser,
  updateUserById
}
