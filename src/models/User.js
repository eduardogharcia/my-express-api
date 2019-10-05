const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 50
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 100
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 1024
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)