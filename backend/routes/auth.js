const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function safeUser(user) {
  const { passwordHash, ...rest } = user
  return rest
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ error: 'name, email, and password are required' })

  if (!email.toLowerCase().endsWith('.edu'))
    return res.status(400).json({ error: 'A .edu email address is required' })

  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters' })

  if (db.getUserByEmail(email))
    return res.status(409).json({ error: 'An account with that email already exists' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = db.createUser({
    name,
    email,
    passwordHash,
    phone: '',
    avatar: '',
    social: { facebook: '', instagram: '', snapchat: '' },
  })

  res.status(201).json({ token: signToken(user), user: safeUser(user) })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'email and password are required' })

  const user = db.getUserByEmail(email)
  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return res.status(401).json({ error: 'Invalid email or password' })

  res.json({ token: signToken(user), user: safeUser(user) })
})

// GET /api/auth/me  🔒
router.get('/me', verifyToken, (req, res) => {
  const user = db.getUserById(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(safeUser(user))
})

// PATCH /api/auth/me  🔒  — update name/phone/avatar
router.patch('/me', verifyToken, (req, res) => {
  const allowed = ['name', 'phone', 'avatar']
  const fields = {}
  for (const k of allowed) {
    if (req.body[k] !== undefined) fields[k] = req.body[k]
  }
  const updated = db.updateUser(req.user.id, fields)
  res.json(safeUser(updated))
})

// PATCH /api/auth/social  🔒  — connect/disconnect a social handle
router.patch('/social', verifyToken, (req, res) => {
  const { platform, handle } = req.body
  const allowed = ['facebook', 'instagram', 'snapchat']
  if (!allowed.includes(platform))
    return res.status(400).json({ error: 'platform must be facebook, instagram, or snapchat' })

  const user = db.getUserById(req.user.id)
  const social = { ...user.social, [platform]: handle || '' }
  const updated = db.updateUser(req.user.id, { social })
  res.json(safeUser(updated))
})

module.exports = router
