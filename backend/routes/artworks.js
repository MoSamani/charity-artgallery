const express = require('express')
const artworkRouter = express.Router()

const {
  postArtwork,
  getAllArtworks,
  getArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworksOFUser,
} = require('../controller/artwork')

artworkRouter
  .route('/')
  .get(getArtwork)
  .post(postArtwork)
  .patch(updateArtwork)
  .delete(deleteArtwork)
artworkRouter.get('/user', getArtworksOFUser)

// Öffentliche Route ohne Authentifizierung
const publicRouter = express.Router()
publicRouter.get('/', getAllArtworks)

// Exportiere beide Router
module.exports = { artworkRouter, publicRouter }
