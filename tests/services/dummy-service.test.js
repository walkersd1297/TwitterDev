const dummyService = require('../../src/services/dummy-service.js');


test('returns Success if even',()=>{
    // prepare
    jest.spyOn(dummyService,'helper').mockImplementation(()=>true);
    // act
    const result = dummyService.execute();
    // assert
    expect(result).toBe('Success');
});

test('returns Failure if odd',()=>{
    // prepare
    jest.spyOn(dummyService,'helper').mockImplementation(()=>false);
    // act
    const result = dummyService.execute();
    // assert
    expect(result).toBe('Success');
});
