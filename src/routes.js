const express = require('express')
const routes = express.Router()

// Middlewares
const Auth = require('./middlewares/Auth')
const mustBeAdmin = Auth.authorization(['admin'])
const mustBeDriver = Auth.authorization(['driver'])

// Controllers
const SessionController = require('./controllers/SessionController')
const AccountController = require('./controllers/AccountController')

// Routes
// -- Session
routes.post('/session/login', SessionController.create)
routes.delete('/session/logout', Auth.authentication, SessionController.destroy)
routes.post('/session/forgot-password', SessionController.update)

// -- User - single resource route
routes.get('/account', Auth.authentication, AccountController.show) // view accout
routes.post('/account', AccountController.create) // create new acount
routes.put('/account', Auth.authentication, AccountController.update) // update acount
routes.put('/account/reset-password/:resetpasstoken', AccountController.updatePassword) // update password

// -- User Credit cards
routes.get('/account/credit-cards', Auth.authentication, () => {})
routes.post('/account/credit-cards', Auth.authentication, () => {})
routes.delete('/account/credit-cards/:id', Auth.authentication, () => {})

routes.get('/account/favorite-drivers', Auth.authentication, () => {})
routes.post('/account/favorite-drivers', Auth.authentication, () => {})
routes.delete('/account/favorite-drivers/:id', Auth.authentication, () => {})

// -- Driver's Cars
// @todo must be driver
routes.get('/account/cars', Auth.authentication, mustBeDriver, () => {})
routes.post('/account/cars', Auth.authentication, mustBeDriver, () => {})
routes.delete('/account/cars/:id', Auth.authentication, mustBeDriver, () => {})

// -- Drivers
routes.get('/drivers', Auth.authentication, () => {})

// Rides
routes.get('/rides', Auth.authentication, () => {})
routes.post('/rides', Auth.authentication, () => {})

// ADMIN management
// Users
routes.get('/users', Auth.authentication, mustBeAdmin, () => {})
routes.post('/users', Auth.authentication, mustBeAdmin, () => {})
routes.delete('/users/:id', Auth.authentication, mustBeAdmin, () => {})

// User's (drivers) cars
routes.get('/users/:id/cars', Auth.authentication, mustBeAdmin, () => {})
routes.post('/users/:id/cars', Auth.authentication, mustBeAdmin, () => {})
routes.delete('/users/:id/cars/:id', Auth.authentication, mustBeAdmin, () => {})

// User's (drivers) credit-cards
routes.get('/users/:id/credit-cards', Auth.authentication, mustBeAdmin, () => {})
routes.post('/users/:id/credit-cards', Auth.authentication, mustBeAdmin, () => {})
routes.delete('/users/:id/credit-cards/:id', Auth.authentication, mustBeAdmin, () => {})

module.exports = routes
