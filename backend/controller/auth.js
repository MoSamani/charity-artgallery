const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        favorites: user.favorites,
        token: token,
      },
    })
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    // throw new BadRequestError('Please provide email and password!')
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Please provide email and password!')
  }

  const user = await User.findOne({ email })
  if (!user) {
    // throw new UnauthenticatedError('Invalid Credentials!')
    return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials!')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    // throw new UnauthenticatedError('Invalid credentials!')
    return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials!')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      favorites: user.favorites,
      token: token,
    },
  })
}

const updateUser = async (req, res) => {
  const { firstname, lastname, email } = req.body

  const user = await User.findOne({ email })
  user.firstname = firstname
  user.lastname = lastname

  // await user.save()
  await User.findByIdAndUpdate(
    { _id: user._id },
    { firstname: firstname, lastname: lastname },
    {
      new: true,
      runValidators: true,
    }
  )
  const _token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      favorites: user.favorites,
      token: _token,
    },
  })
}

const updatePassword = async (req, res) => {
  const { email, password, newpassword } = req.body
  console.log(req.body)

  const user = await User.findOne({ email })

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    // throw new UnauthenticatedError('Invalid credentials!')
    return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials!')
  }

  const _token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      favorites: user.favorites,
      token: _token,
    },
  })
}

const deleteUser = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOneAndDelete({ email: email })
    if (!user) {
      res.status(404).json({ msg: `No User with id: ${userId}` })
    }
    res.status(200).json({ user: user })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { login, register, updateUser, updatePassword, deleteUser }
