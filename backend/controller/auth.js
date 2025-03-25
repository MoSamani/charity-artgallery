const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const { email } = req.body
  const hsdEmailPattern = /^[a-zA-Z0-9._%+-]+@(study\.)?hs-duesseldorf\.de$/
  if (!hsdEmailPattern.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide a valid HSD email!',
    })
  }

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

  try {
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
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  }
}

const updateUser = async (req, res) => {
  const { firstname, lastname, email, favorites } = req.body
  // console.log(req.body)
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' })
  }
  user.firstname = firstname
  user.lastname = lastname

  try {
    await User.findByIdAndUpdate(
      { _id: user._id },
      { firstname: firstname, lastname: lastname, favorites: favorites },
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
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  }
}

const updatePassword = async (req, res) => {
  const { email, password, newpassword } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' })
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    // throw new UnauthenticatedError('Invalid credentials!')
    return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials!')
  }

  try {
    await User.findByIdAndUpdate(
      { _id: user._id },
      { password: newpassword },
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
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  }
}

const deleteUser = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOneAndDelete({ email: email })
    if (!user) {
      res.status(404).json({ msg: `No User with email: ${email}` })
    }
    res.status(200).json({ user: user })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getUser = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ msg: `No User with email: ${email}` })
    }
    const _token = user.createJWT()
    return res.status(StatusCodes.OK).json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        favorites: user.favorites,
        token: _token,
      },
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  login,
  register,
  updateUser,
  updatePassword,
  deleteUser,
  getUser,
}
