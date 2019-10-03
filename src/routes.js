const express = require('express')
const routes = express.Router()

const SessionController = require('./controllers/SessionController')

routes.get('/', (req, res) => {
  res.send('Hello World')
})

routes.post('/usuarios', SessionController.store)

module.exports = routes