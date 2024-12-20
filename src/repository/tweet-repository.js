const Tweet = require('../models/tweet.js');
const mongoose = require('mongoose');
class TweetRepository{
    async create(data){
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
            throw new Error('Something went wrong');
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

    async find(id){
        try {
            const tweet = await Tweet.findById(id).populate({path:'likes'});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getAll(offset, limit) {
        try {
            const tweet = await Tweet.find().skip(offset).limit(limit);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getWithComments(id){
        try {
            const tweet = await Tweet.findById(id).populate({path:'comments'}).lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    } 
}

module.exports = TweetRepository;