const express = require('express')
const router = express.Router()
const morseController = require('../controllers/morse') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, morseController.getMorse)

// router.get('/unmorsefy', ensureAuth, morseController.getMorse)

router.get('/suggest', ensureAuth, morseController.getSuggest)

router.get('/scores', ensureAuth, morseController.getScores)

router.put('/updatescore', morseController.updateScore)

router.post('/createMorse', morseController.createMorse)

module.exports = router