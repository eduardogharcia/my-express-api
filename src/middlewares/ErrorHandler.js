module.exports = async (err, req, res, next) => {
  if (err instanceof SyntaxError) { // formating json body parser error
    err.message = { errors: [{ message: err.message }] }
  }
  res.status(err.status || 500).json(err.message) // @todo hide verbose error on production
}
