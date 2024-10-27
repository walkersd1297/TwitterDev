const {TweetRepository,HashtagRepository} = require('../repository/index.js');

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        let tags = content.match(/#\w+/g);
        tags = tags.map((tag)=>tag.substring(1));
        console.log(tags);
        const tweet = await this.tweetRepository.create(content);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);4
        let alreadyPresentTagsTitle = alreadyPresentTags.map((tag)=>tag.title);
        let newTags = tags.filter((tag)=>!alreadyPresentTagsTitle.includes(tag));
        newTags = newTags.map((tag)=>{return {title:tag, tweet:tweet._id}});
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag)=>{
            tag.tweet.push(tweet._id);
            tag.save();
        });
        return tweet;
    }
}

module.exports = TweetService;