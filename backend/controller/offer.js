const User = require('../models/user')
const Offer = require('../models/offer')
const Artwork = require('../models/artwork')

const createOffer = async (req, res) => {
  try {
    // Prüfen, ob der Benutzer authentifiziert ist
    if (!req.user || !req.user.userID) {
      return res.status(401).json({ msg: 'User not authenticated' })
    }

    // Benutzer abrufen
    const user = await User.findById(req.user.userID)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    // Daten aus dem Request-Body holen
    const { artworkID, price } = req.body
    if (!artworkID || !price) {
      return res.status(400).json({ msg: 'ArtworkID and price are required' })
    }

    // Neues Angebot erstellen
    const offer = await Offer.create({
      price: price,
      email: user.email, // Jetzt sicher, dass user existiert
      createdBy: user._id,
      createdFor: artworkID,
    })

    // Erfolgreiche Antwort senden
    res.status(201).json({
      offerId: offer._id,
      price: offer.price,
      email: offer.email,
      createdBy: offer.createdBy,
      createdFor: offer.createdFor,
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}

const RemoveOffer = async (req, res) => {
  try {
    const { offerId } = req.body

    // Prüfen, ob offerId übergeben wurde
    if (!offerId) {
      return res.status(400).json({ msg: 'Offer ID is required' })
    }

    // Offer aus der Datenbank abrufen
    const offer = await Offer.findById(offerId)

    // Falls kein Offer gefunden wurde
    if (!offer) {
      return res.status(404).json({ msg: 'Offer not found' })
    }

    // Offer löschen
    await Offer.findByIdAndDelete(offerId)

    // Erfolgreiche Antwort senden
    res.status(200).json({ msg: 'Offer deleted successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

const deleteUserOffersForArtwork = async (req, res) => {
  try {
    if (!req.user || !req.user.userID) {
      return res.status(401).json({ msg: 'User not authenticated' })
    }

    const { artworkID } = req.body

    const offers = await Offer.find({
      createdBy: req.user.userID,
      createdFor: artworkID,
    })

    if (offers.length === 0) {
      return res
        .status(404)
        .json({ msg: 'No offers found for this user and artwork' })
    }

    await Offer.deleteMany({
      createdBy: req.user.userID,
      createdFor: artworkID,
    })

    res.status(200).json({ msg: 'Offers deleted successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

const getUserArtworksWithOffers = async (req, res) => {
  try {
    if (!req.user || !req.user.userID) {
      return res.status(401).json({ msg: 'User not authenticated' })
    }

    const artworkIds = await Offer.distinct('createdFor', {
      createdBy: req.user.userID,
    })

    if (artworkIds.length === 0) {
      return res.status(404).json({ msg: 'No artworks found for this user' })
    }

    const artworksWithOffers = await Artwork.find({ _id: { $in: artworkIds } })
      .lean() // Wandelt die Dokumente in reine JSON-Objekte um (Performance-Boost)
      .then(async (artworks) => {
        return Promise.all(
          artworks.map(async (artwork) => {
            const offers = await Offer.find(
              { createdFor: artwork._id, createdBy: req.user.userID },
              '-createdBy -createdFor' // Diese Felder ausblenden, um die Antwort schlanker zu halten
            )
            return { ...artwork, offers }
          })
        )
      })

    res.status(200).json({ artworks: artworksWithOffers })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}

const getAllOffersOfArtwork = async (req, res) => {
  res.status(200).json({ msg: 'getAllOffers' })
}

module.exports = {
  createOffer,
  getAllOffersOfArtwork,
  RemoveOffer,
  getUserArtworksWithOffers,
  deleteUserOffersForArtwork,
}
