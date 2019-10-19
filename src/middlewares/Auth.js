const jwt = require('jsonwebtoken')
const UserService = require('./../services/UserService')
const ClientError = require('../helpers/ClientError')

/**
 * Authentication middleware
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next middleware of stack
 */
const authentication = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    throw new ClientError('Authentication token not found', 401)
  }

  try {
    const verified = jwt.verify(token.replace('Bearer', '').trim(), process.env.SECRET)
    req.user = await UserService.getUserById(verified._id)

    // @TODO update jwt validate date (iat)

    next()
  } catch (err) {
    throw new ClientError('Invalid Token', 401)
  }
}

/**
 * Authorizaton middleware
 * @param {Array<String>} roles Array os roles to match
 */
const authorization = (roles) => (req, res, next) => {
  if (req.user.roles.filter(userRole => roles.includes(userRole)).length) {
    next()
    return
  }
  throw new ClientError('Invalid privileges', 403)
}
module.exports = { authentication, authorization }
