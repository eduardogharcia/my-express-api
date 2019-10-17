const SessionService = require('./../services/SessionService')
const Joi = require('@hapi/joi')
const ValidationError = require('../helpers/ValidationError')

module.exports = {
  async create (req, res) {
    // Validate data
    const validatedData = loginSchema.validate(req.body, { abortEarly: false })
    if (validatedData.error) {
      throw new ValidationError(validatedData.error)
    }
    const token = await SessionService.createNewSessionByEmailAndPassword(req.body.email, req.body.password)
    res.status(201).json({ jwt: token })
  },
  update (req, res) {
    res.send('update sesstion')
  },
  async destroy (req, res) {
    res.send('Logout')
  }
}

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})
