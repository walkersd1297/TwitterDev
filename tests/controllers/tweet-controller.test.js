const TweetService = require('../../src/services/tweet-services.js');
const {get} = require('../../src/controllers/tweet-controller.js');
const{mockRequest,mockResponse} =require('../mocker.js');
jest.mock('../../src/services/tweet-services.js');

test('get the tweets',async()=>{
    const req = mockRequest();
    const res = mockResponse();
    const data = [
        {
            content : 'Test Tweet 1'
        },
        {
            content : 'Test Tweet 2'
        }
    ];
    jest.spyOn(TweetService.prototype,'getTweet').mockReturnValue(data);
    // act
    await get(req,res);
    // assert
    expect(res.json).toHaveBeenCalledWith({
        success:true,
        message:'Tweet found',
        data:data,
        err : {}
    });
});
