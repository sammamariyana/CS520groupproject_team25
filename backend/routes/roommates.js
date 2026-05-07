const express = require('express')
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

// GET /api/roommates  — public, joins user info
router.get('/', (req, res) => {
  const profiles = db.getRoommateProfiles()
  const result = profiles.map(profile => {
    const user = db.getUserById(profile.userId)
    return {
      ...profile,
      name: user?.name ?? 'Unknown',
      avatar: user?.avatar ?? '',
      social: user?.social ?? {},
    }
  })
  res.json(result)
})

// GET /api/roommates/me  🔒
router.get('/me', verifyToken, (req, res) => {
  const profile = db.getRoommateByUserId(req.user.id)
  if (!profile) return res.status(404).json({ error: 'No roommate profile found' })
  res.json(profile)
})

// POST /api/roommates  🔒  — create or update my profile
router.post('/', verifyToken, (req, res) => {
  const { bio, budget, moveIn, sleep, cleanliness, noise,
          smoking, pets, guests, study, hobbies } = req.body

  const profile = db.upsertRoommateProfile(req.user.id, {
    bio: bio || '',
    budget: budget || '',
    moveIn: moveIn || '',
    sleep: sleep || 'flexible',
    cleanliness: cleanliness ?? 3,
    noise: noise ?? 3,
    smoking: smoking ?? false,
    pets: pets ?? false,
    guests: guests || 'occasionally',
    study: study || 'library',
    hobbies: hobbies || [],
  })

  res.status(201).json(profile)
})

module.exports = router
