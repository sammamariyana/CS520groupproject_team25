const express = require('express')
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

// ── Saved Listings ─────────────────────────────────────────────────────────

// GET /api/saved/listings  🔒
router.get('/listings', verifyToken, (req, res) => {
  const saved = db.getSavedListings(req.user.id)
  const result = saved.map(entry => {
    const listing = db.getListingById(entry.listingId)
    return { ...entry, listing: listing || null }
  })
  res.json(result)
})

// POST /api/saved/listings  🔒  — { listingId }
router.post('/listings', verifyToken, (req, res) => {
  const { listingId } = req.body
  if (!listingId) return res.status(400).json({ error: 'listingId is required' })

  if (!db.getListingById(listingId))
    return res.status(404).json({ error: 'Listing not found' })

  const entry = db.saveListing(req.user.id, listingId)
  if (!entry) return res.status(409).json({ error: 'Already saved' })
  res.status(201).json(entry)
})

// PATCH /api/saved/listings/:listingId/note  🔒  — { note }
router.patch('/listings/:listingId/note', verifyToken, (req, res) => {
  const { note } = req.body
  const updated = db.updateSavedListingNote(req.user.id, req.params.listingId, note ?? '')
  if (!updated) return res.status(404).json({ error: 'Saved listing not found' })
  res.json(updated)
})

// DELETE /api/saved/listings/:listingId  🔒
router.delete('/listings/:listingId', verifyToken, (req, res) => {
  const removed = db.unsaveListing(req.user.id, req.params.listingId)
  if (!removed) return res.status(404).json({ error: 'Saved listing not found' })
  res.status(204).end()
})

// ── Saved Roommates ────────────────────────────────────────────────────────

// GET /api/saved/roommates  🔒
router.get('/roommates', verifyToken, (req, res) => {
  const saved = db.getSavedRoommates(req.user.id)
  const result = saved.map(entry => {
    const profile = db.getRoommateProfiles().find(r => r.id === entry.roommateId)
    const user = profile ? db.getUserById(profile.userId) : null
    return {
      ...entry,
      profile: profile
        ? { ...profile, name: user?.name ?? 'Unknown', avatar: user?.avatar ?? '', social: user?.social ?? {} }
        : null,
    }
  })
  res.json(result)
})

// POST /api/saved/roommates  🔒  — { roommateId }
router.post('/roommates', verifyToken, (req, res) => {
  const { roommateId } = req.body
  if (!roommateId) return res.status(400).json({ error: 'roommateId is required' })

  const exists = db.getRoommateProfiles().find(r => r.id === roommateId)
  if (!exists) return res.status(404).json({ error: 'Roommate profile not found' })

  const entry = db.saveRoommate(req.user.id, roommateId)
  if (!entry) return res.status(409).json({ error: 'Already saved' })
  res.status(201).json(entry)
})

// PATCH /api/saved/roommates/:roommateId/note  🔒  — { note }
router.patch('/roommates/:roommateId/note', verifyToken, (req, res) => {
  const { note } = req.body
  const updated = db.updateSavedRoommateNote(req.user.id, req.params.roommateId, note ?? '')
  if (!updated) return res.status(404).json({ error: 'Saved roommate not found' })
  res.json(updated)
})

// DELETE /api/saved/roommates/:roommateId  🔒
router.delete('/roommates/:roommateId', verifyToken, (req, res) => {
  const removed = db.unsaveRoommate(req.user.id, req.params.roommateId)
  if (!removed) return res.status(404).json({ error: 'Saved roommate not found' })
  res.status(204).end()
})

module.exports = router
