const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        max:[250,'Tweet is too long']
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
},{timestamps:true});

const Tweet = mongoose.model('Tweet',tweetSchema);  
module.exports = Tweet;