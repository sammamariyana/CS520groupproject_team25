const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')

const DB_PATH = path.join(__dirname, 'data.json')

const EMPTY_DB = {
  users: [],
  listings: [],
  roommateProfiles: [],
  savedListings: [],
  savedRoommates: [],
  reports: [],
}

function read() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(EMPTY_DB, null, 2))
    return structuredClone(EMPTY_DB)
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// ── Users ──────────────────────────────────────────────────────────────────

function getUsers()              { return read().users }
function getUserById(id)         { return read().users.find(u => u.id === id) }
function getUserByEmail(email)   { return read().users.find(u => u.email === email.toLowerCase()) }

function createUser(fields) {
  const db = read()
  const user = { id: randomUUID(), createdAt: new Date().toISOString(), ...fields,
                 email: fields.email.toLowerCase() }
  db.users.push(user)
  write(db)
  return user
}

function updateUser(id, fields) {
  const db = read()
  const idx = db.users.findIndex(u => u.id === id)
  if (idx === -1) return null
  db.users[idx] = { ...db.users[idx], ...fields }
  write(db)
  return db.users[idx]
}

// ── Listings ───────────────────────────────────────────────────────────────

function getListings()           { return read().listings }
function getListingById(id)      { return read().listings.find(l => l.id === id) }

function createListing(fields) {
  const db = read()
  const listing = { id: randomUUID(), createdAt: new Date().toISOString(), verified: false, ...fields }
  db.listings.push(listing)
  write(db)
  return listing
}

function deleteListing(id) {
  const db = read()
  const before = db.listings.length
  db.listings = db.listings.filter(l => l.id !== id)
  write(db)
  return db.listings.length < before
}

// ── Roommate Profiles ──────────────────────────────────────────────────────

function getRoommateProfiles()   { return read().roommateProfiles }
function getRoommateByUserId(uid){ return read().roommateProfiles.find(r => r.userId === uid) }

function upsertRoommateProfile(userId, fields) {
  const db = read()
  const idx = db.roommateProfiles.findIndex(r => r.userId === userId)
  if (idx === -1) {
    const profile = { id: randomUUID(), userId, createdAt: new Date().toISOString(), ...fields }
    db.roommateProfiles.push(profile)
    write(db)
    return profile
  }
  db.roommateProfiles[idx] = { ...db.roommateProfiles[idx], ...fields, updatedAt: new Date().toISOString() }
  write(db)
  return db.roommateProfiles[idx]
}

// ── Saved Listings ─────────────────────────────────────────────────────────

function getSavedListings(userId)  { return read().savedListings.filter(s => s.userId === userId) }

function saveListing(userId, listingId) {
  const db = read()
  if (db.savedListings.find(s => s.userId === userId && s.listingId === listingId)) return null
  const entry = { id: randomUUID(), userId, listingId, note: '', savedAt: new Date().toISOString() }
  db.savedListings.push(entry)
  write(db)
  return entry
}

function unsaveListing(userId, listingId) {
  const db = read()
  const before = db.savedListings.length
  db.savedListings = db.savedListings.filter(s => !(s.userId === userId && s.listingId === listingId))
  write(db)
  return db.savedListings.length < before
}

function updateSavedListingNote(userId, listingId, note) {
  const db = read()
  const idx = db.savedListings.findIndex(s => s.userId === userId && s.listingId === listingId)
  if (idx === -1) return null
  db.savedListings[idx].note = note
  write(db)
  return db.savedListings[idx]
}

// ── Saved Roommates ────────────────────────────────────────────────────────

function getSavedRoommates(userId)  { return read().savedRoommates.filter(s => s.userId === userId) }

function saveRoommate(userId, roommateId) {
  const db = read()
  if (db.savedRoommates.find(s => s.userId === userId && s.roommateId === roommateId)) return null
  const entry = { id: randomUUID(), userId, roommateId, note: '', savedAt: new Date().toISOString() }
  db.savedRoommates.push(entry)
  write(db)
  return entry
}

function unsaveRoommate(userId, roommateId) {
  const db = read()
  const before = db.savedRoommates.length
  db.savedRoommates = db.savedRoommates.filter(s => !(s.userId === userId && s.roommateId === roommateId))
  write(db)
  return db.savedRoommates.length < before
}

function updateSavedRoommateNote(userId, roommateId, note) {
  const db = read()
  const idx = db.savedRoommates.findIndex(s => s.userId === userId && s.roommateId === roommateId)
  if (idx === -1) return null
  db.savedRoommates[idx].note = note
  write(db)
  return db.savedRoommates[idx]
}

// ── Reports ────────────────────────────────────────────────────────────────

function getReportsByReporter(userId) { return read().reports.filter(r => r.reporterId === userId) }

function createReport(fields) {
  const db = read()
  const report = { id: randomUUID(), status: 'pending', createdAt: new Date().toISOString(), ...fields }
  db.reports.push(report)
  write(db)
  return report
}

module.exports = {
  getUserById, getUserByEmail, createUser, updateUser,
  getListings, getListingById, createListing, deleteListing,
  getRoommateProfiles, getRoommateByUserId, upsertRoommateProfile,
  getSavedListings, saveListing, unsaveListing, updateSavedListingNote,
  getSavedRoommates, saveRoommate, unsaveRoommate, updateSavedRoommateNote,
  getReportsByReporter, createReport,
}
