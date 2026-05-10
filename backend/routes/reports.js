const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/reportsController')
const { verifyToken } = require('../middleware/auth')

router.post('/',      verifyToken, ctrl.create)
router.get('/mine',   verifyToken, ctrl.getMine)

module.exports = router
