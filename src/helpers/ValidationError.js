class ValidationError extends Error {
  constructor (message) {
    super()
    this.status = 422
    this.message = this.cleanMessage(message)
  }

  cleanMessage (message) {
    return { errors: message.details.map(err => ({ message: err.message })) }
  }
}
module.exports = ValidationError
