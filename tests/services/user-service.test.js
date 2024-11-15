// const UserService = require('../../src/services/user-service.js');
// const UserRepository = require('../../src/repository/user-repository.js');


// jest.mock('../../src/repository/user-repository.js');

// describe('user signup',()=>{
//     test('User successfully created',async ()=>{
//         const data = {
//             email:'a@b.com',
//             password : '123456'
//         };
//         // prepare
//         (UserRepository.prototype.create).mockReturnValue({...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'});
//         // act
//         const userService = new UserService();
//         const user = await userService.signup(data);
//         // assert
//         expect(user.email).toBe(data.email); 
//     });
//     test('User not created->Something went wrong ',async ()=>{
//         const data = {
//             email:'a@b.com',
//             password : '123456'
//         };
//         // prepare
//         (UserRepository.prototype.create).mockReturnValue(()=>{
//             throw new Error ('Something went wrong');
//         });
//         // act
//         const userService = new UserService();
//         const user = await userService.signup(data).catch((err)=>{
//             expect(err).toBeInstanceOf(Error);
//             expect(err.message).toBe('Something went wrong');
//         }); 
//     });
// })