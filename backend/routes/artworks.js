const express = require('express')
const router = express.Router()

const {
  postArtwork,
  getAllArtworks,
  getArtwork,
  updateArtwork,
  deleteArtwork,
} = require('../controller/artwork')

router
  .route('/')
  .get(getArtwork)
  .post(postArtwork)
  .patch(updateArtwork)
  .delete(deleteArtwork)
router.get('/all', getAllArtworks)

module.exports = router
