const LikeService = require('../services/like-service.js');
const likeService = new LikeService();

const toggleLike = async(req,res)=>{
    try {
        const response = await likeService.toggleLike(req.query.docID,req.query.docType,req.body.userID);
        res.status(200).json({
            data:response,
            message:'Like toggled',
            success:true,
            err:{}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data:{},
            message:'Internal server error',
            err:error,
            success:false
        })
    }
}

module.exports = {
    toggleLike,
}