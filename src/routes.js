const express = require('express')
const routes = express.Router()

// Middlewares
const authentication = require('./middlewares/authentication')

// Controllers
const SessionController = require('./controllers/SessionController')
const ProfileController = require('./controllers/ProfileController')

// Routes
routes.post('/profile', ProfileController.create)
routes.get('/profile', authentication, ProfileController.show)
routes.put('/profile', authentication, ProfileController.update)

routes.post('/session', SessionController.create)
routes.delete('/session', authentication, SessionController.destroy)

routes.post('/rides', authentication, () => {})

// routes.get('/teste', SessionController.index)

module.exports = routes