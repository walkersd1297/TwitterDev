const express = require('express');
const connectDB = require('./config/database.js');
const apiRoutes = require('./routes/index.js');
const UserRepository = require('./repository/user-repository.js');
const {TweetRepository} = require('./repository/index.js'); 
const LikeService = require('./services/like-service.js');

const setupServer = ()=>{
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(3000,async ()=>{
        console.log('Server is running on port 3000');
        connectDB();
        // const userRepo = new UserRepository();
        // const tweetRepo = new TweetRepository();
        // const tweets = await tweetRepo.getAll(0,10);
        // const users = await userRepo.getAll()
        // const likeService = new LikeService();
        // likeService.toggleLike(tweets[0]._id,'Tweet',users[0]._id);
    });
}

setupServer();