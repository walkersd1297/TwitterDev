const CrudRepository = require('./crud-repository.js');
const Comment = require('../models/comment.js');
class CommentRepository extends CrudRepository{
    constructor(){
        super(Comment);
    }
    async find(id){
        try {
            const tweet = await Comment.findById(id).populate({path:'likes'});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CommentRepository;