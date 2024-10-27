const Tweet = require('../models/tweet.js');

class TweetRepository{
    async create(data){
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id){
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id){
        try {
            const response = await Tweet.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TweetRepository;