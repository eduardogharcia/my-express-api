const express = require('express')
const routes = express.Router()

// Middlewares
const authentication = require('./middlewares/authentication')

// Controllers
const SessionController = require('./controllers/SessionController')
const AccountController = require('./controllers/AccountController')

// Routes
// -- Session (login/logout)
routes.post('/session', SessionController.create)
routes.delete('/session', authentication, SessionController.destroy)

// -- User
routes.get('/account', authentication, AccountController.show)
routes.post('/account', AccountController.create)
routes.put('/account', authentication, AccountController.update)

// -- User Credit cards
routes.get('/account/credit-cards', authentication, () => {})
routes.post('/account/credit-cards', authentication, () => {})
routes.delete('/account/credit-cards/:id', authentication, () => {})

routes.get('/account/favorite-drivers', authentication, () => {})
routes.post('/account/favorite-drivers', authentication, () => {})
routes.delete('/account/favorite-drivers/:id', authentication, () => {})

// -- Driver Cars
// @todo must be driver
routes.get('/account/cars', authentication, () => {})
routes.post('/account/cars', authentication, () => {})
routes.delete('/account/cars/:id', authentication, () => {})

// -- Drivers
routes.get('/drivers', authentication, () => {})

// Rides
routes.get('/rides', authentication, () => {})
routes.post('/rides', authentication, () => {})

module.exports = routes