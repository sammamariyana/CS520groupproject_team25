const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/listingsController')
const { verifyToken } = require('../middleware/auth')

router.get('/',        ctrl.getAll)
router.get('/mine',    verifyToken, ctrl.getMine)
router.get('/:id',     ctrl.getOne)
router.post('/',       verifyToken, ctrl.create)
router.delete('/:id',  verifyToken, ctrl.remove)

module.exports = router
