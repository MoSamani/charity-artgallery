const express = require('express')
const router = express.Router()

const {
  createOffer,
  getAllOffersOfArtwork,
  RemoveOffer,
  getUserArtworksWithOffers,
  deleteUserOffersForArtwork,
  getUserArtworksWithHighestOffer,
} = require('../controller/offer')

router.get('/', getAllOffersOfArtwork)
router.post('/', createOffer)
router.delete('/', RemoveOffer)
router.delete('/deleteuf', deleteUserOffersForArtwork)
// router.get('/userartworks', getUserArtworksWithOffers)
router.get('/userartworks', getUserArtworksWithHighestOffer)

module.exports = router
