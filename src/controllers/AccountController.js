const UserService = require('../services/UserService')

// index, show, create, update, destroy
module.exports = {
  async show (req, res) {
    const user = await UserService.getUserById(req.user)
    if (!user) return res.status(404)
    res.send(user)
  },
  async create (req, res) {
    // @todo validate sent data

    // User must be unique
    const userAlreadyExist = await UserService.getUserByEmail(req.body.email)
    if (userAlreadyExist) return res.status(400).send({ message: 'User Already exists' })

    try {
      const savedUser = await UserService.saveNewUser({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
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
  }
}
