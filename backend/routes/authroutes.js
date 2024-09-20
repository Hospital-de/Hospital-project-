const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const auth = require('../middleware/auth')

router.post('/signup', auth ,authController.signup);
router.post('/login', auth , authController.login);

module.exports = router;