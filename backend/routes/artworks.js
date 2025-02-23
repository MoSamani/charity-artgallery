const express = require('express')
const router = express.Router()

const {
  postImage,
  getAllImages,
  getImage,
  updateImage,
  deleteImage,
} = require('../controller/artwork')

router
  .route('/')
  .get(getImage)
  .post(postImage)
  .patch(updateImage)
  .delete(deleteImage)
router.get('/all', getAllImages)

module.exports = router
