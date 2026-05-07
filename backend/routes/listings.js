const express = require('express')
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

// GET /api/listings?search=&minPrice=&maxPrice=&beds=&available=
router.get('/', (req, res) => {
  const { search, minPrice, maxPrice, beds, available } = req.query
  let listings = db.getListings()

  if (search) {
    const q = search.toLowerCase()
    listings = listings.filter(l =>
      l.title.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
    )
  }
  if (minPrice) listings = listings.filter(l => l.price >= Number(minPrice))
  if (maxPrice) listings = listings.filter(l => l.price <= Number(maxPrice))
  if (beds)     listings = listings.filter(l => l.beds === Number(beds))
  if (available) listings = listings.filter(l => l.available === available)

  // Strip ownerId from public response but keep verified badge
  const safe = listings.map(({ ownerId, ...rest }) => rest)
  res.json(safe)
})

// GET /api/listings/mine  🔒
router.get('/mine', verifyToken, (req, res) => {
  const listings = db.getListings().filter(l => l.ownerId === req.user.id)
  res.json(listings)
})

// GET /api/listings/:id
router.get('/:id', (req, res) => {
  const listing = db.getListingById(req.params.id)
  if (!listing) return res.status(404).json({ error: 'Listing not found' })
  const { ownerId, ...rest } = listing
  res.json(rest)
})

// POST /api/listings  🔒
router.post('/', verifyToken, (req, res) => {
  const { title, address, price, beds, baths, sqft, available,
          description, amenities, pets, photos, contact } = req.body

  if (!title || !address || !price || !beds || !available)
    return res.status(400).json({ error: 'title, address, price, beds, and available are required' })

  const listing = db.createListing({
    ownerId: req.user.id,
    title,
    address,
    price: Number(price),
    beds: Number(beds),
    baths: baths ? Number(baths) : null,
    sqft: sqft ? Number(sqft) : null,
    available,
    description: description || '',
    amenities: amenities || [],
    pets: pets || false,
    photos: photos || [],
    contact: contact || {},
  })

  res.status(201).json(listing)
})

// DELETE /api/listings/:id  🔒
router.delete('/:id', verifyToken, (req, res) => {
  const listing = db.getListingById(req.params.id)
  if (!listing) return res.status(404).json({ error: 'Listing not found' })
  if (listing.ownerId !== req.user.id)
    return res.status(403).json({ error: 'You can only delete your own listings' })

  db.deleteListing(req.params.id)
  res.status(204).end()
})

module.exports = router
