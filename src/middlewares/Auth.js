const jwt = require('jsonwebtoken')
const UserService = require('./../services/UserService')
/**
 * Authentication middleware
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next middleware of stack
 */
const authentication = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    res.status(400).json({ errors: [{ message: 'Authentication token not found' }] })
    return
  }

  try {
    const verified = jwt.verify(token.replace('Bearer', '').trim(), process.env.SECRET)
    req.user = await UserService.getUserById(verified._id)

    // @TODO update jwt validate date (iat)

    next()
  } catch (err) {
    res.status(401).json({ errors: [{ message: 'Invalid token' }] })
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
  res.status(403).json({ errors: [{ message: 'Invalid privileges' }] })
}
module.exports = { authentication, authorization }
