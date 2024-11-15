const Tweet = require('../../src/models/tweet.js');

const TweetRepository = require('../../src/repository/tweet-repository.js');

jest.mock('../../src/models/tweet.js');

describe('Tweet create',()=>{
    test('create a tweet and return it',async()=>{
        // prepare
        const data = {
            content:'Testing tweet',
        }
        const spy = jest.spyOn(Tweet , 'create').mockImplementation(()=>{
            return {...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'};
        });
        // act
        const tweetRepo = new TweetRepository();
        const tweet = await tweetRepo.create(data);
        // assert
        expect(spy).toBeCalled();
        expect(tweet.content).toBe(data.content);
    });
    
    // for catching error
    test('something went wrong when creating a tweet',async()=>{
        // prepare
        const data = {
            content:'Testing Tweet'
        }
        const spy = jest.spyOn(Tweet,'create').mockImplementation(()=>{
            throw new Error('Something went wrong');
        });
        // act 
        const tweetRepo = new TweetRepository();
        const tweet = await tweetRepo.create(data).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Something went wrong')
        })
    });
});

describe('Tweet get all',()=>{
    test('Tweet get all test',async ()=>{
        // prepare\
        const data = {
            content : 'Testing tweet'
        }
        const tweetsArray = [{...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'},{...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'},{...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'}];
        let findResponse = {tweetsArray};
        findResponse.limit = jest.fn((limit)=> findResponse.tweetsArray.slice(0,limit));
        findResponse.skip = jest.fn((offset)=>findResponse);
    
        const spy = jest.spyOn(Tweet ,'find').mockImplementation(()=>{
            return findResponse;
        })
        // act
        const tweetRepo = new TweetRepository();
        const tweets = await tweetRepo.getAll(0,2)
        // assert
        expect(spy).toHaveBeenCalled();
        expect(tweets).toHaveLength(2);
    });

    test('Something went wrong in getting all tweets',async ()=>{
        const data = {
            content : 'Testing Tweet'
        }
        const tweetsArray = [{...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'},{...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'},{...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'}];
        let findResponse = {tweetsArray};
        findResponse.limit = jest.fn((limit)=> findResponse.tweetsArray.slice(0,limit));
        findResponse.skip = jest.fn((offset)=>findResponse);
        const spy = jest.spyOn(Tweet,'find').mockImplementation(()=>{
            throw new Error ('Something went wrong')
        });
        // act
        const tweetRepo = new TweetRepository();
        const tweets = await tweetRepo.getAll(0,2).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Something went wrong');
        });
    })
})

describe('Tweet get',()=>{
    test('Tweet get by id',async()=>{
        // prepare
        const data = {
            content:'Testing tweet'
        }
        const spy = jest.spyOn(Tweet,'findById').mockImplementation(()=>{
            return {...data,id:1}
        })
        // act
        const tweetRepo = new TweetRepository();
        const tweets = await tweetRepo.get(1);
        // assert
        expect(tweets.id).toBe(1);
        expect(tweets.content).toBe(data.content);
    });
    
    test('Tweet get by id but id doesnot exist',async ()=>{
        // prepare
        const data = {
            content : 'Testing Tweet'
        }
        const spy =jest.spyOn(Tweet,'findById').mockImplementation(()=>{
            throw new Error('Something went wrong');
        });
        // act
        const tweetRepo= new TweetRepository();
        const tweets = await tweetRepo.get(1).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Something went wrong');
        });
    });
});
