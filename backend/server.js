const express = require('express')
const cors = require('cors')
const corsOptions = { origin: ['http://localhost:3000'] }
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const { offerRouter, publicDonationRouter } = require('./routes/offer')
const { artworkRouter, publicRouter } = require('./routes/artworks')
const { localUpload } = require('./controller/upload')
const cloudinary = require('cloudinary').v2

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
app.use(cors(corsOptions))

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
})

// Routes
// app.use('/api/user', userRouter)
app.use('/api/offer', authenticateUser, offerRouter)
app.use('/api/user/auth', authRouter)
app.use(
  '/api/artwork',
  authenticateUser,
  localUpload.single('image'),
  artworkRouter
)
app.use('/api/public', publicRouter)
app.use('/api/public/donates', publicDonationRouter)

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
