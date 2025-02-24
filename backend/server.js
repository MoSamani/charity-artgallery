const express = require('express')
const cors = require('cors')
const corsOptions = { origin: ['http://localhost:3000'] }
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const artworkRouter = require('./routes/artworks')
// const fileUpload = require('express-fileupload')

// User authentication
const authenticateUser = require('./middleware/authentication')

// Error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// DB connection
const connectDB = require('./db/connect')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(express.json())
// app.use(fileUpload({ useTempFiles: true }))

app.use(cors(corsOptions))

// Routes
app.use('/api/user', userRouter)
app.use('/api/user/auth', authRouter)
app.use('/api/artwork', artworkRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
