const express = require('express')
const cors = require('cors')
const corsOptions = { origin: ['http://localhost:3000'] }
const userTasks = require('./routes/user')
const connectDB = require('./db/connect')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/user', userTasks)

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
