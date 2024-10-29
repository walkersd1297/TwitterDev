const {CommentRepository,TweetRepository} = require('../repository/index.js');

class CommentService{
    constructor(){
        this.commentRepo = new CommentRepository();
        this.tweetRepo = new TweetRepository();
    }

    async create(docID,docType,userID,data){
        if(docType==='Tweet'){
            var commentable = await this.tweetRepo.get(docID);

        }else if(docType==='Comment'){
            var commentable = await this.commentRepo.get(docID);
        } else{
            throw new Error('Invalid docType');
        }

        const newComment = await this.commentRepo.create({
            userId:userID,
            docModel:docType,
            doc:docID,
            content:data,
            comments:[]
        });
        commentable.comments.push(newComment);
        await commentable.save();

        return newComment;
    }
}

module.exports = CommentService;