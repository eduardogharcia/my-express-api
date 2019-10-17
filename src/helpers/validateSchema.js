const ValidationError = require('./ValidationError')

module.exports = (data, schema) => {
  const validatedData = schema.validate(data, { abortEarly: false })
  if (validatedData.error) {
    throw new ValidationError(validatedData.error)
  }
  return validatedData
}
