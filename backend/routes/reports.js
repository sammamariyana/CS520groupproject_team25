const express = require('express')
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

const VALID_TARGETS = ['listing', 'roommate']
const VALID_REASONS = ['scam', 'inappropriate', 'wrong_info', 'harassment', 'other']

// POST /api/reports  🔒
router.post('/', verifyToken, (req, res) => {
  const { targetType, targetId, reason, detail } = req.body

  if (!targetType || !targetId || !reason)
    return res.status(400).json({ error: 'targetType, targetId, and reason are required' })

  if (!VALID_TARGETS.includes(targetType))
    return res.status(400).json({ error: `targetType must be one of: ${VALID_TARGETS.join(', ')}` })

  if (!VALID_REASONS.includes(reason))
    return res.status(400).json({ error: `reason must be one of: ${VALID_REASONS.join(', ')}` })

  const report = db.createReport({
    reporterId: req.user.id,
    targetType,
    targetId,
    reason,
    detail: detail || '',
  })

  res.status(201).json(report)
})

// GET /api/reports/mine  🔒
router.get('/mine', verifyToken, (req, res) => {
  const reports = db.getReportsByReporter(req.user.id)
  res.json(reports)
})

module.exports = router
