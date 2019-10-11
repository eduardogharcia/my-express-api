const app = require('./src/app')
const mongoose = require('mongoose')

// Connect to mongodb
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3000)
