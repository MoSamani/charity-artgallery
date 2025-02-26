const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'firstname must be provided'],
    trim: true,
  },
  medium: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  mprise: {
    type: Number,
    default: 20,
  },
  donate: {
    type: Boolean,
    default: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  // image1: {
  //   data: Buffer,
  //   contentType: String,
  // },
  image1_url: {
    type: String,
  },
  image1_public_id: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
})

module.exports = mongoose.model('Artwork', artworkSchema)
