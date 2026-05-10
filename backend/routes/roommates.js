const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/roommatesController')
const { verifyToken } = require('../middleware/auth')

router.get('/',    ctrl.getAll)
router.get('/me',  verifyToken, ctrl.getMe)
router.post('/',   verifyToken, ctrl.upsert)

module.exports = router
