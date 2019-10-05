const User = require('./../models/User')
const bcript = require('bcryptjs')

/**
 * @param {String} id User id
 * @return User model
 */
const getUserById = async (id) => {
  return await User.findOne({ _id: id })
}

/**
 * 
 * @param {String} email Email address of the user
 * @return User model
 */
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

/**
 * 
 * @param {Object} user 
 * @return User model just created
 */
const saveNewUser = async (user) => {
  const userAlreadyExists = await getUserByEmail(user.email)

  if (userAlreadyExists) {
    throw new Error('User already exists')
  }

  // hash password
  user.password = await hashPassword(user.password)

  return await user.save()
}

/**
 * 
 * @param {String} password 
 * @return Password hashed to store
 */
const hashPassword = async (password) => {
  const salt = await bcript.genSalt(10)
  hashedPass = await bcript.hash(password, salt)
  return hashPassword
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
    throw new Error('User not exists')
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