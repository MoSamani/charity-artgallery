const express = require('express')
const offerRouter = express.Router()

const {
  createOffer,
  getAllOffersOfArtwork,
  RemoveOffer,
  // getUserArtworksWithOffers,
  deleteUserOffersForArtwork,
  getUserArtworksWithHighestOffer,
  berechneBekommeneOffers,
  getTotalMaxDonations,
} = require('../controller/offer')

offerRouter.get('/', getAllOffersOfArtwork)
offerRouter.post('/', createOffer)
offerRouter.delete('/', RemoveOffer)
offerRouter.delete('/deleteoffer', deleteUserOffersForArtwork)
// router.get('/userartworks', getUserArtworksWithOffers)
offerRouter.get('/userartworks', getUserArtworksWithHighestOffer)
offerRouter.get('/getoffers', berechneBekommeneOffers)
// offerRouter.get('/totaldonations', getTotalMaxDonations)

const publicDonationRouter = express.Router()
publicDonationRouter.get('/', getTotalMaxDonations)

module.exports = { offerRouter, publicDonationRouter }
