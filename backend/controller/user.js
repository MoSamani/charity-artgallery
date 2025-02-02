const User = require('../models/user')

const getAllUsers = (req, res) => {
  res.send('get all user')
}

const getUser = (req, res) => {
  res.json({ id: req.params.id })
}

const createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json(user)
}

const updateUser = (req, res) => {
  res.json({ id: req.params.id })
}

const deleteUser = (req, res) => {
  res.json({ id: req.params.id })
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser }
