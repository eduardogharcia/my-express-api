const jwt = require('jsonwebtoken')
/**
 * Authorization middleware
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next middleware of stack
 */
const authorization = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    res.status(400).json({ error: 'Authorization token not found' })
    return
  }

  try {
    const verified = jwt.verify(token.replace('Bearer', '').trim(), process.env.SECRET)
    req.user = verified

    // @TODO update jwt validate date

    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
module.exports = authorization
