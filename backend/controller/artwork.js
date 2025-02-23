const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const Artwork = require('../models/artwork')

const postImage = async (req, res) => {
  console.log(req.body)
  try {
    const artwork = await Artwork.create({ ...req.body })
    console.log('artwork', artwork)
    res.status(StatusCodes.CREATED).json({
      artwork: {
        name: artwork.name,
        lastname: artwork.type,
        prise: artwork.mprise,
      },
    })
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error })
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
