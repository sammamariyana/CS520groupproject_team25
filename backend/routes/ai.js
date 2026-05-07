const express = require('express')
const multer = require('multer')
const path = require('path')
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files are allowed'))
  },
})

// ── AI Roommate Match ──────────────────────────────────────────────────────
// POST /api/ai/match  🔒
// Body: { budget, moveIn, sleep, cleanliness, noise, smoking, pets, guests, study, hobbies }
router.post('/match', verifyToken, (req, res) => {
  const answers = req.body
  const profiles = db.getRoommateProfiles().filter(p => p.userId !== req.user.id)

  if (profiles.length === 0) return res.json([])

  const scored = profiles.map(profile => {
    let score = 0
    const reasons = []

    // Sleep schedule compatibility (0–25 pts)
    if (answers.sleep && profile.sleep) {
      if (answers.sleep === profile.sleep) {
        score += 25
        reasons.push(`Same sleep schedule (${profile.sleep})`)
      } else if (answers.sleep === 'flexible' || profile.sleep === 'flexible') {
        score += 15
        reasons.push('Flexible sleep schedule')
      } else {
        score += 5
      }
    }

    // Cleanliness (0–20 pts) — closer = higher score
    if (answers.cleanliness !== undefined && profile.cleanliness !== undefined) {
      const diff = Math.abs(Number(answers.cleanliness) - Number(profile.cleanliness))
      const pts = Math.max(0, 20 - diff * 5)
      score += pts
      if (pts >= 15) reasons.push('Similar cleanliness standards')
    }

    // Noise level (0–15 pts)
    if (answers.noise !== undefined && profile.noise !== undefined) {
      const diff = Math.abs(Number(answers.noise) - Number(profile.noise))
      const pts = Math.max(0, 15 - diff * 4)
      score += pts
      if (pts >= 10) reasons.push('Compatible noise preferences')
    }

    // Smoking (0–15 pts)
    if (answers.smoking !== undefined && profile.smoking !== undefined) {
      if (String(answers.smoking) === String(profile.smoking)) {
        score += 15
        reasons.push(profile.smoking ? 'Both smoke-friendly' : 'Both prefer smoke-free')
      }
    }

    // Pets (0–10 pts)
    if (answers.pets !== undefined && profile.pets !== undefined) {
      if (String(answers.pets) === String(profile.pets)) {
        score += 10
        reasons.push(profile.pets ? 'Both are pet-friendly' : 'Neither has pets')
      }
    }

    // Study environment (0–10 pts)
    if (answers.study && profile.study) {
      if (answers.study === profile.study) {
        score += 10
        reasons.push(`Same study preference (${profile.study})`)
      }
    }

    // Shared hobbies (0–5 pts per shared hobby, max 15 pts)
    if (Array.isArray(answers.hobbies) && Array.isArray(profile.hobbies)) {
      const shared = answers.hobbies.filter(h => profile.hobbies.includes(h))
      const pts = Math.min(15, shared.length * 5)
      score += pts
      if (shared.length > 0) reasons.push(`Shared interests: ${shared.join(', ')}`)
    }

    const user = db.getUserById(profile.userId)
    const maxScore = 110
    const matchPercent = Math.round((score / maxScore) * 100)

    return {
      profile: {
        ...profile,
        name: user?.name ?? 'Unknown',
        avatar: user?.avatar ?? '',
        social: user?.social ?? {},
      },
      score: matchPercent,
      reasons: reasons.slice(0, 4),
    }
  })

  // Sort by score desc, return top 5
  scored.sort((a, b) => b.score - a.score)
  res.json(scored.slice(0, 5))
})

// ── AI Lease Review ────────────────────────────────────────────────────────
// POST /api/ai/lease-review  🔒  — multipart PDF upload
router.post('/lease-review', verifyToken, upload.single('pdf'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'A PDF file is required' })

  // In production this would: strip PII, send text to an LLM, return structured result.
  // For now we return a realistic mock based on common lease patterns.
  res.json({
    overview: 'This is a 12-month fixed-term lease for a 2-bedroom apartment starting August 1, 2026. Monthly rent is $950 with a $1,900 security deposit. The lease auto-renews month-to-month unless either party gives 60 days written notice.',
    terms: [
      { label: 'Lease Term',       value: '12 months (Aug 1, 2026 – Jul 31, 2027)' },
      { label: 'Monthly Rent',     value: '$950/month, due on the 1st' },
      { label: 'Security Deposit', value: '$1,900 (2 months rent)' },
      { label: 'Late Fee',         value: '$75 after 5-day grace period' },
      { label: 'Utilities',        value: 'Tenant responsible for all (electric, gas, internet)' },
      { label: 'Pets',             value: 'No pets allowed' },
      { label: 'Subletting',       value: 'Not permitted without written consent' },
      { label: 'Notice to Vacate', value: '60 days written notice required' },
    ],
    redFlags: [
      { severity: 'high',   title: 'Auto-renew clause',           desc: 'Lease auto-renews without requiring your signature. Give 60 days written notice to avoid being locked in.' },
      { severity: 'high',   title: 'Landlord entry notice',       desc: 'Section 12 allows entry with only 12 hours notice. Massachusetts law requires 24 hours except in emergencies.' },
      { severity: 'medium', title: 'Non-refundable cleaning fee', desc: 'A mandatory $200 cleaning fee is charged at move-out regardless of property condition.' },
      { severity: 'medium', title: 'Snow removal responsibility', desc: 'Tenant is responsible for snow removal from driveway and walkways — verify local ordinances.' },
      { severity: 'low',    title: 'Pest control',                desc: 'Tenant covers pest control costs after the first 30 days. Clarify this before signing.' },
    ],
    recommendations: [
      'Request that the auto-renew clause be changed to require affirmative renewal.',
      'Ask the landlord to correct the entry notice period to 24 hours per MA law.',
      'Negotiate removal or conditionality of the non-refundable cleaning fee.',
      'Document the property condition with photos on move-in day.',
      'Clarify in writing who is responsible for snow removal.',
    ],
  })
})

module.exports = router
