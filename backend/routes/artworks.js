const express = require('express')
const router = express.Router()

const {
  postArtwork,
  getAllArtworks,
  getArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworksOFUser,
} = require('../controller/artwork')

router
  .route('/')
  .get(getArtwork)
  .post(postArtwork)
  .patch(updateArtwork)
  .delete(deleteArtwork)
router.get('/all', getAllArtworks)
router.get('/user', getArtworksOFUser)

module.exports = router
