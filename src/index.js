require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

// Connect to mongodb
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Middlewares
app.use(express.json())
app.use(routes)

app.listen(3000)
