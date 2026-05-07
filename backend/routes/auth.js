const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/authController')
const { verifyToken } = require('../middleware/auth')

router.post('/register',  ctrl.register)
router.post('/login',     ctrl.login)
router.get('/me',         verifyToken, ctrl.me)
router.patch('/me',       verifyToken, ctrl.updateMe)
router.patch('/social',   verifyToken, ctrl.updateSocial)

module.exports = router
