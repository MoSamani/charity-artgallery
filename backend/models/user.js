const mongoose = require('mongoose')
const validator = require('email-validator')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'firstname must be provided'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'lastname must be provided'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password must be provided'],
    minlength: [8, 'Password should contains at least 8 characters'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validator.validate, 'Please fill a valid email address'],
  },
  favorites: [String],
})

module.exports = mongoose.model('User', userSchema)
