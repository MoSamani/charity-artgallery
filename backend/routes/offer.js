const express = require('express')
const router = express.Router()

const {
  createOffer,
  getAllOffersOfArtwork,
  RemoveOffer,
  getUserArtworksWithOffers,
  deleteUserOffersForArtwork,
} = require('../controller/offer')

router.get('/', getAllOffersOfArtwork)
router.post('/', createOffer)
router.delete('/', RemoveOffer)
router.delete('/deleteUserOffersForArtwork', deleteUserOffersForArtwork)
router.get('/userArtworksWithOffers', getUserArtworksWithOffers)

module.exports = router
