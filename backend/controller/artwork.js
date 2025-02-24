const Artwork = require('../models/artwork')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const postImage = async (req, res) => {
  console.log(req.body)
  const { name, medium, size, description, mprise, donate, email } = req.body
  console.log(email)
  const user = await User.findOne({ email: email })
  console.log(user)
  try {
    const artwork = await Artwork.create({
      name,
      medium,
      size,
      description,
      mprise,
      donate,
      createdBy: user._id,
    })
    console.log('artwork', artwork)
    res.status(StatusCodes.CREATED).json({
      artwork: 'Done',
    })
  } catch (error) {
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
