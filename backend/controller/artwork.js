const Artwork = require('../models/artwork')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const fs = require('fs')
const { uploadFromBuffer } = require('./upload')

const postImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' })
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
    })
  } catch (error) {
    console.log(error.message)
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
  }
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
