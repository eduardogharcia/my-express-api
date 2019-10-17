const UserService = require('../services/UserService')
const Joi = require('@hapi/joi')
const validateSchema = require('../helpers/validateSchema')

// index, show, create, update, destroy
module.exports = {
  async show (req, res) {
    const user = await UserService.getUserById(req.user)
    if (!user) throw new Error('User not found')
    if (!user) return res.status(404).send({ errors: [{ message: 'User not found' }] })
    res.send(user)
  },
  async create (req, res) {
    // Validate data
    const validatedData = validateSchema(req.body, createAccountSchema)

    const savedUser = await UserService.saveNewUser({
      ...validatedData.value,
      roles: ['user']
    })

    res.status(201).json(savedUser)
  },
  async update (req, res) {
    // Validate data
    const validatedData = validateSchema(req.body, createAccountSchema)

    const updatedUser = await UserService.updateUserById(req.user._id, validatedData)
    res.json(updatedUser)
  },
  async updatePassword (req, res) {
    res.send('update password account')
  }
}

const createAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).max(30).required()
})
