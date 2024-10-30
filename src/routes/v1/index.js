const express = require('express');
const router = express.Router();
const tweetController = require('../../controllers/tweet-controller.js');
const likeController = require('../../controllers/like-controller.js');
const commentController = require('../../controllers/comment-controller.js');
const userController = require('../../controllers/auth-controller.js');

router.post('/tweets',tweetController.create);
router.get('/tweets/:id',tweetController.get);
router.post('/likes/toggle',likeController.toggleLike);
router.post('/comments',commentController.createComment);
router.post('/signup',userController.signup);
module.exports = router;