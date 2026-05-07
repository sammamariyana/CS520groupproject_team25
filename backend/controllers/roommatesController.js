const RoommateProfile = require('../models/RoommateProfile')
const User = require('../models/User')

exports.getAll = (req, res) => {
  const profiles = RoommateProfile.findAll()
  const result = profiles.map(profile => {
    const user = User.findById(profile.userId)
    return {
      ...profile,
      name: user?.name ?? 'Unknown',
      avatar: user?.avatar ?? '',
      social: user?.social ?? {},
    }
  })
  res.json(result)
}

exports.getMe = (req, res) => {
  const profile = RoommateProfile.findByUserId(req.user.id)
  if (!profile) return res.status(404).json({ error: 'No roommate profile found' })
  res.json(profile)
}

exports.upsert = (req, res) => {
  const { bio, budget, moveIn, sleep, cleanliness, noise,
          smoking, pets, guests, study, hobbies } = req.body

  const profile = RoommateProfile.upsert(req.user.id, {
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
}
