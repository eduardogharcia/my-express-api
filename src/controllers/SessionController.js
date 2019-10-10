const SessionService = require('./../services/SessionService')

module.exports = {
  async create (req, res) {
    try {
      const token = await SessionService.createNewSessionByEmailAndPassword(req.body.email, req.body.password)

      res.status(201).json({ jwt: token })
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
  },
  update (req, res) {
    res.send('update sesstion')
  },
  async destroy (req, res) {
    res.send('Logout')
  }
}
