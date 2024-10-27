const express = require('express');
const router = express.Router();
const tweetController = require('../../controllers/tweet-controller.js');

router.post('/tweets',tweetController.create);

module.exports = router;