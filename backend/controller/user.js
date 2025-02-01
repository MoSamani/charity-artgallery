const getAllUsers = (req, res) => {
  res.send('get all user')
}

const getUser = (req, res) => {
  res.json({ id: req.params.id })
}

const createUser = (req, res) => {
  res.json(req.body)
}

const updateUser = (req, res) => {
  res.json({ id: req.params.id })
}

const deleteUser = (req, res) => {
  res.json({ id: req.params.id })
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser }
