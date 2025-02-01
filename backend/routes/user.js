const express = require('express')
const cors = require('cors')
const corsOptions = { origin: ['http://localhost:3000'] }
const router = express.Router()

const app = express()
const PORT = 5000

app.use(cors(corsOptions))
app.use(express.json())

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/user')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
module.exports = router
