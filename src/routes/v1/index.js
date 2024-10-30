const express = require('express');
const router = express.Router();
const tweetController = require('../../controllers/tweet-controller.js');
const likeController = require('../../controllers/like-controller.js');
const commentController = require('../../controllers/comment-controller.js');
const userController = require('../../controllers/auth-controller.js');
const {authenticate} = require('../../middlewares/authenticate.js');

router.post('/tweets',authenticate,tweetController.create);
router.get('/tweets/:id',authenticate,tweetController.get);
router.post('/likes/toggle',authenticate,likeController.toggleLike);
router.post('/comments',authenticate,commentController.createComment);
router.post('/signup',userController.signup);
router.post('/login',userController.login);
module.exports = router;