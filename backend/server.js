const express = require('express')
const cors = require('cors')
const corsOptions = { origin: ['http://localhost:3000'] }

const app = express()
const PORT = 5000

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Wellcome ...</h1>')
})

app.get('/api', (req, res) => {
  res.json({ app: 'artgallery' })
})

app.listen(PORT, () => {
  'server started on port 5000...'
})
