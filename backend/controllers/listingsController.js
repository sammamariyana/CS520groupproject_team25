const Listing = require('../models/Listing')

exports.getAll = (req, res) => {
  const { search, minPrice, maxPrice, beds, available } = req.query
  let listings = Listing.findAll()

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

  res.json(listings.map(({ ownerId, ...rest }) => rest))
}

exports.getMine = (req, res) => {
  res.json(Listing.findAll().filter(l => l.ownerId === req.user.id))
}

exports.getOne = (req, res) => {
  const listing = Listing.findById(req.params.id)
  if (!listing) return res.status(404).json({ error: 'Listing not found' })
  const { ownerId, ...rest } = listing
  res.json(rest)
}

exports.create = (req, res) => {
  const { title, address, price, beds, baths, sqft, available,
          description, amenities, pets, photos, contact } = req.body

  if (!title || !address || !price || !beds || !available)
    return res.status(400).json({ error: 'title, address, price, beds, and available are required' })

  const listing = Listing.create({
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
}

exports.remove = (req, res) => {
  const listing = Listing.findById(req.params.id)
  if (!listing) return res.status(404).json({ error: 'Listing not found' })
  if (listing.ownerId !== req.user.id)
    return res.status(403).json({ error: 'You can only delete your own listings' })

  Listing.delete(req.params.id)
  res.status(204).end()
}
