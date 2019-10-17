require('dotenv').config()
const express = require('express')
require('express-async-errors')

const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')

const app = express()

// Middlewares
app.use(cors())
app.use(helmet({ noCache: true }))
app.use(express.json())
app.use(routes)

module.exports = app
