const UserService = require('../services/UserService')
const Joi = require('@hapi/joi')

// index, show, create, update, destroy
module.exports = {
  async show (req, res) {
    const user = await UserService.getUserById(req.user)
    if (!user) return res.status(404)
    res.send(user)
  },
  async create (req, res) {
    // Validate data
    const validatedData = createAccountSchema.validate(req.body, { abortEarly: false })
    if (validatedData.error) {
      res.status(422).json(validatedData.error)
      return
    }

    // User must be unique
    const userAlreadyExist = await UserService.getUserByEmail(req.body.email)
    if (userAlreadyExist) return res.status(400).send({ message: 'User Already exists' })

    try {
      const savedUser = await UserService.saveNewUser({
        ...validatedData.value,
        roles: ['user']
      })

      res.status(201).json(savedUser)
    } catch (err) {
      res.status(400).send(err.message)
    }
  },
  async update (req, res) {
    const user = await UserService.getUserById(req.user)
    if (!user) return res.status(404)
    const updatedUser = await UserService.updateUserById(user._id, req.user)
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
