const express = require('express')
const cors = require('cors')
const corsOptions = { origin: ['http://localhost:3000'] }
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
// DB connection
const connectDB = require('./db/connect')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/user/auth', authRouter)

const start = async () => {
  try {
    await connectDB(process.env.mongo_uri)
    app.listen(PORT, () => {
      console.log('server is listening on port 5000...')
    })
  } catch (error) {
    console.log(error)
  }
}

start()
