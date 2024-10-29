const express = require('express');
const router = express.Router();
const tweetController = require('../../controllers/tweet-controller.js');
const likeController = require('../../controllers/like-controller.js');

router.post('/tweets',tweetController.create);
router.post('/likes/toggle',likeController.toggleLike);
module.exports = router;