const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function safeUser(user) {
  const { passwordHash, ...rest } = user
  return rest
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ error: 'name, email, and password are required' })

  if (!email.toLowerCase().endsWith('.edu'))
    return res.status(400).json({ error: 'A .edu email address is required' })

  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters' })

  if (User.findByEmail(email))
    return res.status(409).json({ error: 'An account with that email already exists' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = User.create({
    name,
    email,
    passwordHash,
    phone: '',
    avatar: '',
    social: { facebook: '', instagram: '', snapchat: '' },
  })

  res.status(201).json({ token: signToken(user), user: safeUser(user) })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'email and password are required' })

  const user = User.findByEmail(email)
  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return res.status(401).json({ error: 'Invalid email or password' })

  res.json({ token: signToken(user), user: safeUser(user) })
}

exports.me = (req, res) => {
  const user = User.findById(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(safeUser(user))
}

exports.updateMe = (req, res) => {
  const allowed = ['name', 'phone', 'avatar']
  const fields = {}
  for (const k of allowed) {
    if (req.body[k] !== undefined) fields[k] = req.body[k]
  }
  const updated = User.update(req.user.id, fields)
  res.json(safeUser(updated))
}

exports.updateSocial = (req, res) => {
  const { platform, handle } = req.body
  const allowed = ['facebook', 'instagram', 'snapchat']
  if (!allowed.includes(platform))
    return res.status(400).json({ error: 'platform must be facebook, instagram, or snapchat' })

  const user = User.findById(req.user.id)
  const social = { ...user.social, [platform]: handle || '' }
  const updated = User.update(req.user.id, { social })
  res.json(safeUser(updated))
}
