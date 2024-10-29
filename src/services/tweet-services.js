const {TweetRepository,HashtagRepository} = require('../repository/index.js');

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        // finding hashtags from the content tags is an array of strings
        let tags = content.match(/#\w+/g)
                          .map((tag)=>tag.substring(1).toLowerCase());
        // creating a new tweet
        const tweet = await this.tweetRepository.create(data);
        // finding already present tags
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        // filtering out the new tags getting only the tags instead of the whole object
        let alreadyPresentTagsTitle = alreadyPresentTags.map(tag=>tag.title);
        // filtering the tags that are not already present
        let newTags = tags.filter(tag=>!alreadyPresentTagsTitle.includes(tag));
        // adding the title and tweet id to the new tags
        // as expected by our model
        newTags = newTags.map(tag=>{
            return {title:tag, tweets:[tweet.id]}
        });
        // bulk creating the new tags newatgs is an array of objects [{ttile:tag,tweet:tweet._id}]
        await this.hashtagRepository.bulkCreate(newTags);
        // adding the tweet id to the already present tags
        alreadyPresentTags.forEach((tag)=>{
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;
    }

    async getTweetsWithComments(tweetId){
        try {
            const tweet = await this.tweetRepository.getWithComments(tweetId);
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}


module.exports = TweetService;