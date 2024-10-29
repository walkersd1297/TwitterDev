const CommentService = require('../services/comment-service.js');
const commentService = new CommentService();

const createComment = async(req,res)=>{
    try {
        const response = await commentService.create(req.query.docID,req.query.docType,req.body.userID,req.body.content);
        res.status(200).json({
            data:response,
            message:'Comment created',
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
    createComment,
}