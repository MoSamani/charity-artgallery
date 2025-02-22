const User = require('../models/user')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({ users: users })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getUser = async (req, res) => {
  try {
    const { id: userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ msg: `No User with id: ${userId}` })
    }
    res.status(200).json({ user: user })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

// const createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body)
//     res.status(201).json(user)
//   } catch (error) {
//     res.status(500).json({ msg: error })
//   }
// }

const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) {
      res.status(404).json({ msg: `No User with id: ${userId}` })
    }
    res.status(200).json({ user: user })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params
    const user = await User.findOneAndDelete({ _id: userId })
    if (!user) {
      res.status(404).json({ msg: `No User with id: ${userId}` })
    }
    res.status(200).json({ user: user })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = { getAllUsers, getUser, updateUser, deleteUser }
