const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth',     require('./routes/auth'))
app.use('/api/listings', require('./routes/listings'))
app.use('/api/roommates',require('./routes/roommates'))
app.use('/api/saved',    require('./routes/saved'))
app.use('/api/reports',  require('./routes/reports'))
app.use('/api/ai',       require('./routes/ai'))

app.get('/', (req, res) => res.json({ message: 'CampusNest API is running' }))

app.listen(PORT, () => console.log(`CampusNest server running on port ${PORT}`))
