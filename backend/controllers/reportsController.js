const Report = require('../models/Report')

const VALID_TARGETS = ['listing', 'roommate']
const VALID_REASONS = ['scam', 'inappropriate', 'wrong_info', 'harassment', 'other']

exports.create = (req, res) => {
  const { targetType, targetId, reason, detail } = req.body

  if (!targetType || !targetId || !reason)
    return res.status(400).json({ error: 'targetType, targetId, and reason are required' })

  if (!VALID_TARGETS.includes(targetType))
    return res.status(400).json({ error: `targetType must be one of: ${VALID_TARGETS.join(', ')}` })

  if (!VALID_REASONS.includes(reason))
    return res.status(400).json({ error: `reason must be one of: ${VALID_REASONS.join(', ')}` })

  const report = Report.create({
    reporterId: req.user.id,
    targetType,
    targetId,
    reason,
    detail: detail || '',
  })

  res.status(201).json(report)
}

exports.getMine = (req, res) => {
  res.json(Report.findByReporter(req.user.id))
}
