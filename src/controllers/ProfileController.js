const UserService = require('./../services/UserService')

// index, show, create, update, destroy
module.exports = {
  async index (req, res) {
    const user = await UserService.getUserById(req.user)
    if (!user) return res.status(404)
    res.send(user)
  },
  async show (req, res) {
    res.send('meu perfil')
  },
  async create (req, res) {
    // @todo validate sent data

    // User must be unique
    const userAlreadyExist = await UserService.getUserByEmail(req.body.email)
    if (userAlreadyExist) return res.status(400).send({error: 'User Already exists'})
    
    try {
      const savedUser = await UserService.saveNewUser({
        email: req.body.email,
        name: req.body.name,
        password:  req.body.password
      })
      res.json(savedUser)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  async update (req, res) {
    res.send('é...')
    // const user = await UserService.getUserById(req.user)
    // if (!user) return res.status(404)

  }
}