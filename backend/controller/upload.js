const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads'))
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname)
//   },
// })
// const localUpload = multer({ storage: storage })

const storage = multer.memoryStorage()
const localUpload = multer({ storage })

const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'artgallery' }, // Optional: Ordner in Cloudinary
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
    streamifier.createReadStream(buffer).pipe(uploadStream)
  })
}

// const cloudUpload = async (req, res) => {
//   const result = await cloudinary.uploader.upload()
// }

module.exports = { localUpload, uploadFromBuffer }
