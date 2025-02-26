const Artwork = require('../models/artwork')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const fs = require('fs')

// const postImage = async (req, res) => {
//   const { name, medium, size, description, mprise, donate, email } = req.body
//   const user = await User.findOne({ email: email })

//   try {
//     const artwork = await Artwork.create({
//       name,
//       medium,
//       size,
//       description,
//       mprise,
//       donate,
//       image1: {
//         data: fs.readFileSync('uploads/' + req.file.filename),
//         contentType: 'image/jpeg',
//       },
//       createdBy: user._id,
//     })
//     res.status(StatusCodes.CREATED).json({
//       artworkId: artwork._id,
//     })
//   } catch (error) {
//     console.log(error.message)
//     res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
//   }
// }

const postImage = async (req, res) => {
  const { name, medium, size, description, mprise, donate, email } = req.body
  const user = await User.findOne({ email: email })

  // try {
  //   const artwork = await Artwork.create({
  //     name,
  //     medium,
  //     size,
  //     description,
  //     mprise,
  //     donate,
  //     image1: {
  //       data: fs.readFileSync('uploads/' + req.file.filename),
  //       contentType: 'image/jpeg',
  //     },
  //     createdBy: user._id,
  //   })
  //   res.status(StatusCodes.CREATED).json({
  //     artworkId: artwork._id,
  //   })
  // } catch (error) {
  //   console.log(error.message)
  //   res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  // }
  res.status(200).json({ msg: 'Image saved!' })
}

const getAllImages = async (req, res) => {
  try {
    const artworks = await Artwork.find({})
    res.status(200).json({ artworks: artworks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getImage = async (req, res) => {
  console.log('getImage')
  res.status(200).json({ msg: 'getImage' })
}

const updateImage = async (req, res) => {
  console.log('updateImage')
  res.status(200).json({ msg: 'updateImage' })
}

const deleteImage = async (req, res) => {
  console.log('deleteImage')
  res.status(200).json({ msg: 'deleteImage' })
}

module.exports = { postImage, getAllImages, getImage, updateImage, deleteImage }
