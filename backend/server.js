const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Handle CORS preflight for all routes (Express 5 doesn't support wildcard routes)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())

app.use('/api/auth',     require('./routes/auth'))
app.use('/api/listings', require('./routes/listings'))
app.use('/api/roommates',require('./routes/roommates'))
app.use('/api/saved',    require('./routes/saved'))
app.use('/api/reports',  require('./routes/reports'))
app.use('/api/ai',       require('./routes/ai'))

app.get('/', (req, res) => res.json({ message: 'CampusNest API is running' }))

app.listen(PORT, () => console.log(`CampusNest server running on port ${PORT}`))
