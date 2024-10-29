const TweetService = require('../services/tweet-services.js');

const tweetService = new TweetService();

const create = async (req,res)=>{
    try {
        const tweet = await tweetService.create(req.body);
        res.status(201).json({
            data:tweet,
            message:'Tweet created',
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data:{},
            message:'Tweet not created',
            success:false,
            err:error
        });
    }
}

const get = async (req,res)=>{
    try {
        const tweet = await tweetService.getTweetsWithComments(req.params.id);
        res.status(200).json({
            data:tweet,
            message:'Tweet found',
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data:{},
            message:'Tweet not found',
            success:false,
            err:error
        });
    }
}



module.exports = {
    create,
    get,
}