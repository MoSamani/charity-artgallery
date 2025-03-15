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
  getTotalDonations,
} = require('../controller/offer')

offerRouter.get('/', getAllOffersOfArtwork)
offerRouter.post('/', createOffer)
offerRouter.delete('/', RemoveOffer)
offerRouter.delete('/deleteoffer', deleteUserOffersForArtwork)
// router.get('/userartworks', getUserArtworksWithOffers)
offerRouter.get('/userartworks', getUserArtworksWithHighestOffer)
offerRouter.get('/getoffers', berechneBekommeneOffers)
offerRouter.get('/totaldonations', getTotalDonations)

const publicDonationRouter = express.Router()
publicDonationRouter.get('/', getTotalDonations)

module.exports = { offerRouter, publicDonationRouter }
