const mongoose = require('mongoose')
const validator = require('email-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  favorites: { type: [String], default: [] },
})

userSchema.methods.comparePassword = async function (canditatePassword) {
  // const isMatch = await bcrypt.compare(canditatePassword, this.password)
  const isMatch = this.password === canditatePassword
  return isMatch
}

// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, firstname: this.firstname },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  )
}

module.exports = mongoose.model('User', userSchema)
