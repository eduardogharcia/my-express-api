class clientError extends Error {
  constructor (message, status = 400) {
    super()
    this.status = status
    this.message = { errors: [{ message }] }
  }
}
module.exports = clientError
