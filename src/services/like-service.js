const {LikeRepository,TweetRepository} = require('../repository/index.js');

class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(docID,docType,userId){  // api/v1/likes/toggle?id=docID&docType=Tweet
        if(docType==='Tweet'){
            var likeable =await this.tweetRepository.find(docID);

        }else if(docType==='Comment'){
            // TODO
        } else{
            throw new Error('Invalid docType');
        }

        const likeExists = await this.likeRepository.findByUserAndDoc({
            user:userId,
            docModel:docType,
            doc:docID,
        });

        // if the like exists by a user then remove it 
        if(likeExists){
            likeable.likes.pull(likeExists.id);
            await likeable.save();
            await likeExists.deleteOne();
            var isRemoved = true;
        }else{
            // else add a new like
            const newLike = await this.likeRepository.create({
                user:userId,
                docModel:docType,
                doc:docID,
            });
            likeable.likes.push(newLike);
            await likeable.save();
            var isRemoved = false;
        }
        return isRemoved;
    }
}

module.exports = LikeService;