const express = require('express')
const router = express.Router()

const {
  createOffer,
  getAllOffersOfArtwork,
  RemoveOffer,
  getUserArtworksWithOffers,
  deleteUserOffersForArtwork,
  getUserArtworksWithHighestOffer,
  berechneBekommeneOffers,
} = require('../controller/offer')

router.get('/', getAllOffersOfArtwork)
router.post('/', createOffer)
router.delete('/', RemoveOffer)
router.delete('/deleteoffer', deleteUserOffersForArtwork)
// router.get('/userartworks', getUserArtworksWithOffers)
router.get('/userartworks', getUserArtworksWithHighestOffer)
router.get('/getoffers', berechneBekommeneOffers)

module.exports = router
