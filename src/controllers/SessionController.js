// index, show, create, update, destroy

// const User = require('./../models/User')
// const bcript = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const SessionService = require('./../services/SessionService')

module.exports = {
  async create (req, res) {
    try{
      const token = await SessionService.createNewSessionByEmailAndPassword(req.body.email, req.body.password)
      res.json({
        jwt: token
      })
    } catch (err) {
      res.status(400).json({
        error: err.message
      })
    }
  },
  async destroy (req, res) {
    res.send('Logout')
  }
}