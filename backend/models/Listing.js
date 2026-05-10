const { randomUUID } = require('crypto')
const { read, write } = require('../db')

module.exports = {
  findAll() {
    return read().listings
  },

  findById(id) {
    return read().listings.find(l => l.id === id) ?? null
  },

  create(fields) {
    const db = read()
    const listing = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      verified: false,
      ...fields,
    }
    db.listings.push(listing)
    write(db)
    return listing
  },

  delete(id) {
    const db = read()
    const before = db.listings.length
    db.listings = db.listings.filter(l => l.id !== id)
    write(db)
    return db.listings.length < before
  },
}
