const { randomUUID } = require('crypto')
const { read, write } = require('../db')

module.exports = {
  // ── Listings ──────────────────────────────────────────────────────────────

  getSavedListings(userId) {
    return read().savedListings.filter(s => s.userId === userId)
  },

  saveListingForUser(userId, listingId) {
    const db = read()
    if (db.savedListings.find(s => s.userId === userId && s.listingId === listingId)) return null
    const entry = { id: randomUUID(), userId, listingId, note: '', savedAt: new Date().toISOString() }
    db.savedListings.push(entry)
    write(db)
    return entry
  },

  unsaveListing(userId, listingId) {
    const db = read()
    const before = db.savedListings.length
    db.savedListings = db.savedListings.filter(s => !(s.userId === userId && s.listingId === listingId))
    write(db)
    return db.savedListings.length < before
  },

  updateListingNote(userId, listingId, note) {
    const db = read()
    const idx = db.savedListings.findIndex(s => s.userId === userId && s.listingId === listingId)
    if (idx === -1) return null
    db.savedListings[idx].note = note
    write(db)
    return db.savedListings[idx]
  },

  // ── Roommates ─────────────────────────────────────────────────────────────

  getSavedRoommates(userId) {
    return read().savedRoommates.filter(s => s.userId === userId)
  },

  saveRoommateForUser(userId, roommateId) {
    const db = read()
    if (db.savedRoommates.find(s => s.userId === userId && s.roommateId === roommateId)) return null
    const entry = { id: randomUUID(), userId, roommateId, note: '', savedAt: new Date().toISOString() }
    db.savedRoommates.push(entry)
    write(db)
    return entry
  },

  unsaveRoommate(userId, roommateId) {
    const db = read()
    const before = db.savedRoommates.length
    db.savedRoommates = db.savedRoommates.filter(s => !(s.userId === userId && s.roommateId === roommateId))
    write(db)
    return db.savedRoommates.length < before
  },

  updateRoommateNote(userId, roommateId, note) {
    const db = read()
    const idx = db.savedRoommates.findIndex(s => s.userId === userId && s.roommateId === roommateId)
    if (idx === -1) return null
    db.savedRoommates[idx].note = note
    write(db)
    return db.savedRoommates[idx]
  },
}
