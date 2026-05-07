const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Manual CORS — must be first, before all routes and body parsing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()
  next()
})

app.use(express.json())

app.use('/api/auth',      require('./routes/auth'))
app.use('/api/listings',  require('./routes/listings'))
app.use('/api/roommates', require('./routes/roommates'))
app.use('/api/saved',     require('./routes/saved'))
app.use('/api/reports',   require('./routes/reports'))
app.use('/api/ai',        require('./routes/ai'))

app.get('/', (req, res) => res.json({ message: 'CampusNest API is running' }))

app.listen(PORT, () => console.log(`CampusNest server running on port ${PORT}`))
