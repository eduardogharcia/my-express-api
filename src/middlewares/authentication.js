const jwt = require('jsonwebtoken')

module.exports  = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    res.status(401).send({ error: 'Access denied' })
    return
  }
  
  try {
    const verified = jwt.verify(token, process.env.SECRET)
    req.user = verified
    // @todo update jwt validate date
    next()
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' })
  }
}