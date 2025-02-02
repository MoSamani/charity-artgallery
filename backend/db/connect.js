const mongoose = require('mongoose')

// const connectionString =
//   'mongodb+srv://admin:CharityArtGallerySecret@charityartgallery.rqjng.mongodb.net/artgallery?retryWrites=true&w=majority&appName=Charityartgallery'

const connectDB = (url) => {
  mongoose.connect(url)
}
module.exports = connectDB
