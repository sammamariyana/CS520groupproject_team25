const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/savedController')
const { verifyToken } = require('../middleware/auth')

router.get('/listings',                         verifyToken, ctrl.getSavedListings)
router.post('/listings',                        verifyToken, ctrl.saveListing)
router.patch('/listings/:listingId/note',       verifyToken, ctrl.updateListingNote)
router.delete('/listings/:listingId',           verifyToken, ctrl.unsaveListing)

router.get('/roommates',                        verifyToken, ctrl.getSavedRoommates)
router.post('/roommates',                       verifyToken, ctrl.saveRoommate)
router.patch('/roommates/:roommateId/note',     verifyToken, ctrl.updateRoommateNote)
router.delete('/roommates/:roommateId',         verifyToken, ctrl.unsaveRoommate)

module.exports = router
