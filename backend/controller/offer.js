const User = require('../models/user')
const Offer = require('../models/offer')
const Artwork = require('../models/artwork')
const mongoose = require('mongoose')

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

const getUserArtworksWithHighestOffer = async (req, res) => {
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

    const artworks = await Artwork.find({ _id: { $in: artworkIds } })
      .populate('createdBy', 'firstname lastname') // Künstlerdaten mitnehmen
      .lean()

    const highestOffers = await Offer.aggregate([
      {
        $match: {
          createdFor: { $in: artworkIds },
        },
      },
      {
        $group: {
          _id: '$createdFor', // Gruppieren nach Artwork-ID
          highestOffer: { $max: '$price' }, // Nur das höchste Offer behalten
        },
      },
    ])
    const artworksWithHighestOffer = artworks.map((artwork) => {
      const highestOfferData = highestOffers.find(
        (offer) => String(offer._id) === String(artwork._id)
      )

      return {
        ...artwork,
        highestOffer: highestOfferData ? highestOfferData.highestOffer : null,
      }
    })

    res.status(200).json({ artworks: artworksWithHighestOffer })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

const berechneBekommeneOffers = async (req, res) => {
  try {
    // Finde alle Artworks des Benutzers
    const artworks = await Artwork.find({ createdBy: req.user.userID })
    const artworkIds = artworks.map((a) => a._id)

    // Finde alle Offers, die zu den Artworks des Benutzers gehören
    const offers = await Offer.find({ createdFor: { $in: artworkIds } })

    let wonOffers = 0
    let donatedOffers = 0

    offers.forEach((offer) => {
      const artwork = artworks.find((a) => a._id.equals(offer.createdFor))
      if (artwork) {
        if (artwork.donate) {
          donatedOffers += offer.price
        } else {
          wonOffers += offer.price
        }
      }
    })

    return res.status(200).json({ offers: { wonOffers, donatedOffers } })
  } catch (error) {
    console.error('Fehler beim Berechnen der Offers:', error)
    res.status(500).json({ msg: 'Server error', error: error.message })
  }
}

const getTotalMaxDonations = async (req, res) => {
  try {
    // Finde alle Artworks, die für Spenden freigegeben sind
    const donationArtworks = await Artwork.find({ donate: true }).select('_id')

    const artworkIds = donationArtworks.map((artwork) => artwork._id)

    if (artworkIds.length === 0) {
      return res.status(200).json({ totalMaxDonates: 0 })
    }

    const result = await Offer.aggregate([
      {
        $match: { createdFor: { $in: artworkIds } }, // Nur Offers für Spenden-Artworks
      },
      {
        $group: {
          _id: '$createdFor', // Gruppieren nach Artwork-ID
          maxDonation: { $max: '$price' }, // Maximaler Preis pro Artwork
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$maxDonation' }, // Summe der höchsten Spenden pro Artwork
        },
      },
    ])

    const totalMaxDonates = result.length > 0 ? result[0].totalAmount : 0

    return res.status(200).json({ totalMaxDonates: totalMaxDonates })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const getAllOffersOfArtwork = async (req, res) => {
  res.status(200).json({ msg: 'getAllOffers' })
}

const getHighestOfferUser = async (req, res) => {
  try {
    const { artworkId } = req.body

    if (!artworkId) {
      return res.status(400).json({ msg: 'Artwork ID is required' })
    }

    // Höchstes Angebot für das gegebene Artwork finden
    const highestOffer = await Offer.findOne({ createdFor: artworkId })
      .sort({ price: -1 }) // Höchstes zuerst
      .limit(1)
      .populate('createdBy', 'firstname lastname email _id') // Nur relevante User-Felder abrufen

    if (!highestOffer) {
      return res.status(404).json({ msg: 'No offers found for this artwork' })
    }

    const { _id, email, firstname, lastname } = highestOffer.createdBy

    return res.status(200).json({ userId: _id, email, firstname, lastname })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const getHighestOfferUsers = async (req, res) => {
  try {
    const artworks = await Artwork.find({}).select('_id name')

    if (!artworks.length) {
      return res.status(404).json({ msg: 'No artworks found' })
    }

    const artworkMap = new Map(
      artworks.map((art) => [art._id.toString(), art.name])
    )

    // console.log('Artwork Map:', artworkMap)

    const testOffers = await Offer.find({
      createdFor: { $in: [...artworkMap.keys()] },
    })
    // console.log('Offers found:', testOffers)

    if (testOffers.length === 0) {
      return res.status(404).json({ msg: 'No offers found for these artworks' })
    }

    const artworkIds = artworks.map(
      (art) => new mongoose.Types.ObjectId(art._id)
    )

    const highestOffers = await Offer.aggregate([
      {
        $match: { createdFor: { $in: artworkIds } },
      },
      {
        $sort: { price: -1 },
      },
      {
        $group: {
          _id: '$createdFor',
          highestOffer: { $first: '$$ROOT' },
        },
      },
    ])

    if (!highestOffers.length) {
      return res.status(404).json({ msg: 'No highest offers found' })
    }

    // console.log('Highest Offers:', highestOffers)

    const userPromises = highestOffers.map(async (offer) => {
      const populatedOffer = await Offer.findById(
        offer.highestOffer._id
      ).populate('createdBy', 'firstname lastname email _id')

      if (!populatedOffer || !populatedOffer.createdBy) {
        console.log(`No user found for offer ${offer.highestOffer._id}`)
        return null
      }

      return {
        artworkId: offer._id,
        artworkTitle: artworkMap.get(offer._id.toString()) || 'Unknown Title',
        userId: populatedOffer.createdBy._id,
        firstname: populatedOffer.createdBy.firstname,
        lastname: populatedOffer.createdBy.lastname,
        email: populatedOffer.createdBy.email,
        price: populatedOffer.price, // Preis der höchsten Offer
      }
    })

    const users = (await Promise.all(userPromises)).filter(
      (user) => user !== null
    )

    return res.status(200).json({ users: users })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createOffer,
  getAllOffersOfArtwork,
  RemoveOffer,
  getUserArtworksWithOffers,
  deleteUserOffersForArtwork,
  getUserArtworksWithHighestOffer,
  berechneBekommeneOffers,
  getTotalMaxDonations,
  getHighestOfferUser,
  getHighestOfferUsers,
}
