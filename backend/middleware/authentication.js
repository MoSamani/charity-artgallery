const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // throw new UnauthenticatedError('Authentication invalid!')
    return res.status(401).json({ msg: 'Authentication invalid!' })
  }
  const token = authHeader.split(' ')[1]
  console.log(authHeader)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userID: payload.userID, firstname: payload.firstname }

    next()
  } catch (error) {
    // throw new UnauthenticatedError('Authentication invalid!')
    return res.status(401).json({ msg: 'Authentication invalid!' })
  }
}

// const auth = async (req, res, next) => {
//   const authHeader = req.headers.authorization
//   if (!authHeader || !authHeader.startsWith('Bearer')) {
//     return res.status(401).json({ msg: 'Authentication invalid!' })
//   }
//   const token = authHeader.split(' ')[1]

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = { userID: payload.userID, firstname: payload.firstname }
//     next()
//   } catch (error) {
//     return res.status(401).json({ msg: 'Authentication invalid!' })
//   }
// }

module.exports = auth
