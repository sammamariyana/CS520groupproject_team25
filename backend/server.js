// this is the backend server for the CampusNest app
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🏠 CampusNest API is running!' })
})

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  res.json({ 
    success: true, 
    message: 'User registered successfully!',
    user: { name, email }
  })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  res.json({ 
    success: true, 
    message: 'Login successful!',
    user: { email, name: 'Sammam Ariyana' }
  })
})

// Listings routes
app.get('/api/listings', (req, res) => {
  res.json({
    success: true,
    listings: [
      { id: 1, price: 900, address: '123 N Pleasant St', beds: 2, verified: true },
      { id: 2, price: 750, address: '45 Fearing St', beds: 1, verified: true },
      { id: 3, price: 1100, address: '8 Meadow St', beds: 3, verified: false },
    ]
  })
})

// Roommates routes
app.get('/api/roommates', (req, res) => {
  res.json({
    success: true,
    roommates: [
      { id: 1, name: 'Sara A.', major: 'CS', budget: '$700-900' },
      { id: 2, name: 'Ben K.', major: 'ECE', budget: '$800-1000' },
    ]
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CampusNest server running on port ${PORT}`)
})