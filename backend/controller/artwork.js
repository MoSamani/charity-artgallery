const Artwork = require('../models/artwork')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const fs = require('fs')
const { uploadFromBuffer } = require('./upload')

const postArtwork = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' })
    }

    if (!req.file.mimetype.startsWith('image')) {
      return res.status(400).json({ msg: 'Please Upload Image!' })
    }

    if (req.file.size > 1024 * 1024) {
      return res.status(400).json({ msg: 'Please upload image smaller 1MB!' })
    }

    const result = await uploadFromBuffer(req.file.buffer)
    image = { url: result.secure_url, public_id: result.public_id }
  } catch (error) {
    console.error('Cloudinary Upload Error:', error)
    res.status(500).json({ msg: error.message })
  }

  const { name, medium, size, description, mprise, donate, email } = req.body
  const user = await User.findOne({ email: email })

  try {
    const artwork = await Artwork.create({
      name,
      medium,
      size,
      description,
      mprise,
      donate,
      image1_url: image.url,
      image1_public_id: image.public_id,
      createdBy: user._id,
    })
    res.status(StatusCodes.CREATED).json({
      artworkId: artwork._id,
      name: artwork.name,
      medium: artwork.medium,
      size: artwork.size,
      description: artwork.description,
      mprise: artwork.mprise,
      donate: artwork.donate,
      image1_url: image.url,
      image1_public_id: image.public_id,
    })
  } catch (error) {
    console.log(error.message)
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  }
}

const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({}).populate(
      'createdBy',
      'firstname lastname'
    )

    res.status(200).json({ artworks: artworks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getArtwork = async (req, res) => {
  console.log('GetImage')
  res.status(200).json({ msg: 'getImage' })
}

// const updateArtwork = async (req, res) => {
//   console.log('Updateimage')
//   console.log(req.body)
//   const { name, medium, size, description, mprise, donate, _id } = req.body

//   if (req.file) {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ msg: 'No file uploaded' })
//       }

//       if (!req.file.mimetype.startsWith('image')) {
//         return res.status(400).json({ msg: 'Please Upload Image!' })
//       }

//       if (req.file.size > 1024 * 1024) {
//         return res.status(400).json({ msg: 'Please upload image smaller 1MB!' })
//       }

//       const result = await uploadFromBuffer(req.file.buffer)
//       image = { url: result.secure_url, public_id: result.public_id }
//     } catch (error) {
//       console.error('Cloudinary Upload Error:', error)
//       res.status(500).json({ msg: error.message })
//     }

//     try {
//       const artwork = await Artwork.findByIdAndUpdate(
//         { _id: _id },
//         {
//           name,
//           medium,
//           size,
//           description,
//           mprise,
//           donate,
//           image1_url: image.url,
//           image1_public_id: image.public_id,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//       res.status(StatusCodes.CREATED).json({
//         artworkId: artwork._id,
//         name: artwork.name,
//         medium: artwork.medium,
//         size: artwork.size,
//         description: artwork.description,
//         mprise: artwork.mprise,
//         donate: artwork.donate,
//         image1_url: image.url,
//         image1_public_id: image.public_id,
//       })
//     } catch (error) {
//       console.log(error.message)
//       res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
//     }
//   }

//   try {
//     const artwork = await Artwork.findByIdAndUpdate(
//       { _id: _id },
//       {
//         name,
//         medium,
//         size,
//         description,
//         mprise,
//         donate,
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     )
//     res.status(StatusCodes.OK).json({
//       artworkId: artwork._id,
//       name: artwork.name,
//       medium: artwork.medium,
//       size: artwork.size,
//       description: artwork.description,
//       mprise: artwork.mprise,
//       donate: artwork.donate,
//       image1_url: artwork.image1_url,
//       image1_public_id: artwork.image1_public_id,
//     })
//   } catch (error) {
//     console.log(error.message)
//     res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
//   }
// }
const updateArtwork = async (req, res) => {
  console.log('Updateimage')
  console.log(req.body)

  const { name, medium, size, description, mprise, donate, _id } = req.body
  let image = null // Speichert die neue Bild-URL, falls vorhanden

  if (req.file) {
    try {
      // Validierung der Datei
      if (!req.file.mimetype.startsWith('image')) {
        return res.status(400).json({ msg: 'Please upload an image!' })
      }

      if (req.file.size > 1024 * 1024) {
        return res
          .status(400)
          .json({ msg: 'Please upload an image smaller than 1MB!' })
      }

      // Bild in Cloudinary hochladen
      const result = await uploadFromBuffer(req.file.buffer)
      image = { url: result.secure_url, public_id: result.public_id }
    } catch (error) {
      console.error('Cloudinary Upload Error:', error)
      return res.status(500).json({ msg: error.message }) // RETURN, um doppelte Antwort zu verhindern
    }
  }

  try {
    // Artwork in der DB aktualisieren
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      { _id: _id },
      {
        name,
        medium,
        size,
        description,
        mprise,
        donate,
        ...(image && {
          image1_url: image.url,
          image1_public_id: image.public_id,
        }), // Bild nur aktualisieren, wenn es existiert
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedArtwork) {
      return res.status(404).json({ msg: 'Artwork not found' })
    }

    return res.status(StatusCodes.OK).json({
      artworkId: updatedArtwork._id,
      name: updatedArtwork.name,
      medium: updatedArtwork.medium,
      size: updatedArtwork.size,
      description: updatedArtwork.description,
      mprise: updatedArtwork.mprise,
      donate: updatedArtwork.donate,
      image1_url: updatedArtwork.image1_url,
      image1_public_id: updatedArtwork.image1_public_id,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  }
}

const getArtworksOFUser = async (req, res) => {
  if (!req.user || !req.user.userID) {
    return res.status(401).json({ msg: 'User not authenticated' })
  }
  try {
    const artworks = await Artwork.find({
      createdBy: req.user.userID,
    }).populate('createdBy', 'firstname lastname')
    res.status(200).json({ artworks: artworks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const deleteArtwork = async (req, res) => {
  console.log('deleteImage')
  res.status(200).json({ msg: 'deleteImage' })
}

module.exports = {
  postArtwork,
  getAllArtworks,
  getArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworksOFUser,
}
