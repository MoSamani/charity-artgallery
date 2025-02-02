const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: String,
  favorites: [String],
})

module.exports = mongoose.model('User', userSchema)
