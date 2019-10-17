const ValidationError = require('../helpers/ValidationError')
module.exports = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.status).json(err.message)
    return
  }
  res.status(err.status || 500).json(err.message)
}
