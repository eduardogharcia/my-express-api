require('dotenv').config()
const express = require('express')
require('express-async-errors')

const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const errorHandler = require('./middlewares/ErrorHandler')

const app = express()

// Middlewares
app.use(cors())
app.use(helmet({ noCache: true }))
app.use(express.json())
app.use(routes)
app.use(errorHandler)
module.exports = app
