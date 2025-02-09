const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
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
    res.status(500).json({ msg: error })
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

module.exports = { login, register }
