const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const ctrl = require('../controllers/aiController')
const { verifyToken } = require('../middleware/auth')

const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF files are allowed'))
  },
})

router.post('/match',        verifyToken, ctrl.match)
router.post('/lease-review', verifyToken, upload.single('pdf'), ctrl.leaseReview)

module.exports = router
