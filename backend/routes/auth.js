const express = require('express')
const router = express.Router()

const {
  login,
  register,
  updateUser,
  updatePassword,
  deleteUser,
  getUser,
} = require('../controller/auth')

router.post('/register', register)
router.post('/login', login)
router.patch('/updateUser', updateUser)
router.patch('/updatePassword', updatePassword)
router.delete('/removeUser', deleteUser)
router.post('/getUser', getUser)
module.exports = router
