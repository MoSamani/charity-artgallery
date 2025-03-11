const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email must be provided'],
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, 'Price must be provided'],
      min: [20, 'Price must be at least 1'],
      default: 20,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: 'Artwork',
      required: [true, 'Please provide Artwork'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Offer', offerSchema)
