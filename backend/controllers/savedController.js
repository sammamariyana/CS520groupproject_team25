const Saved = require('../models/Saved')
const Listing = require('../models/Listing')
const RoommateProfile = require('../models/RoommateProfile')
const User = require('../models/User')

// ── Listings ──────────────────────────────────────────────────────────────

exports.getSavedListings = (req, res) => {
  const saved = Saved.getSavedListings(req.user.id)
  const result = saved.map(entry => ({
    ...entry,
    listing: Listing.findById(entry.listingId) ?? null,
  }))
  res.json(result)
}

exports.saveListing = (req, res) => {
  const { listingId } = req.body
  if (!listingId) return res.status(400).json({ error: 'listingId is required' })
  if (!Listing.findById(listingId)) return res.status(404).json({ error: 'Listing not found' })

  const entry = Saved.saveListingForUser(req.user.id, listingId)
  if (!entry) return res.status(409).json({ error: 'Already saved' })
  res.status(201).json(entry)
}

exports.updateListingNote = (req, res) => {
  const updated = Saved.updateListingNote(req.user.id, req.params.listingId, req.body.note ?? '')
  if (!updated) return res.status(404).json({ error: 'Saved listing not found' })
  res.json(updated)
}

exports.unsaveListing = (req, res) => {
  const removed = Saved.unsaveListing(req.user.id, req.params.listingId)
  if (!removed) return res.status(404).json({ error: 'Saved listing not found' })
  res.status(204).end()
}

// ── Roommates ─────────────────────────────────────────────────────────────

exports.getSavedRoommates = (req, res) => {
  const saved = Saved.getSavedRoommates(req.user.id)
  const result = saved.map(entry => {
    const profile = RoommateProfile.findAll().find(r => r.id === entry.roommateId)
    const user = profile ? User.findById(profile.userId) : null
    return {
      ...entry,
      profile: profile
        ? { ...profile, name: user?.name ?? 'Unknown', avatar: user?.avatar ?? '', social: user?.social ?? {} }
        : null,
    }
  })
  res.json(result)
}

exports.saveRoommate = (req, res) => {
  const { roommateId } = req.body
  if (!roommateId) return res.status(400).json({ error: 'roommateId is required' })

  const exists = RoommateProfile.findAll().find(r => r.id === roommateId)
  if (!exists) return res.status(404).json({ error: 'Roommate profile not found' })

  const entry = Saved.saveRoommateForUser(req.user.id, roommateId)
  if (!entry) return res.status(409).json({ error: 'Already saved' })
  res.status(201).json(entry)
}

exports.updateRoommateNote = (req, res) => {
  const updated = Saved.updateRoommateNote(req.user.id, req.params.roommateId, req.body.note ?? '')
  if (!updated) return res.status(404).json({ error: 'Saved roommate not found' })
  res.json(updated)
}

exports.unsaveRoommate = (req, res) => {
  const removed = Saved.unsaveRoommate(req.user.id, req.params.roommateId)
  if (!removed) return res.status(404).json({ error: 'Saved roommate not found' })
  res.status(204).end()
}
