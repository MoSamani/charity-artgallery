const express = require('express')
const cors = require('cors')
const corsOptions = { origin: ['http://localhost:3000'] }
const userTasks = require('./routes/user')

const app = express()
const PORT = 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/user', userTasks)

// app.get('/', (req, res) => {
//   res.send('<h1>Wellcome ...</h1>')
// })
//Api: handle user information
// app.get('/api', (req, res) => {
//   res.json({ app: 'artgallery' })
// })
// app.get('/api/user', (req, res) => {
//   res.json({ user: 'user' })
// })
// app.get('/api/user/:id', (req, res) => {
//   id = req.params.id
//   res.json({ userID: id })
// })

app.listen(PORT, () => {
  'server started on port 5000...'
})
