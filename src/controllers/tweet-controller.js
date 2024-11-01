const upload = require('../config/file-upload-s3.js');
const TweetService = require('../services/tweet-services.js');

const tweetService = new TweetService();

const upload = require('../config/file-upload-s3.js');
const singleUploader = upload.single('image');

const create = async (req,res)=>{
    try {
        singleUploader(req,res,async function(err,data){
            if(err){
                console.log(err);
                return res.status(500).json({
                    data:{},
                    message:'Image not uploaded',
                    success:false,
                    err:err
                });
            }
            console.log('image url',req.file);
            const payload = {...req.body};
            payload.image = req.file.location;
            const tweet = await tweetService.create(payload);
            res.status(201).json({
                data:tweet,
                message:'Tweet created',
                success:true,
                err:{}
            });
        })
            
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