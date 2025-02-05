const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res
      .status(StatusCodes.CREATED)
      .json({ user: { user: user.firstname }, token })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const login = async (req, res) => {
  res.status(StatusCodes.CREATED).json(req.body)
}

module.exports = { login, register }
