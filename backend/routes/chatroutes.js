const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatcontroller');

router.get('/:userId/:doctorId', chatController.getChatHistory);
router.post('/', chatController.saveMessage);

module.exports = router;