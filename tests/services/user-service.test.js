const UserService = require('../../src/services/user-service.js');
const UserRepository = require('../../src/repository/user-repository.js');


jest.mock('../../src/repository/user-repository.js');

describe('user signup',()=>{
    test('User successfully created',async ()=>{
        const data = {
            email:'a@b.com',
            password : '123456'
        };
        // prepare
        (UserRepository.prototype.create).mockReturnValue({...data,createdAt:'2024-11-11',updatedAt:'2024-11-11'});
        // act
        const userService = new UserService();
        const user = await userService.signup(data);
        // assert
        expect(user.email).toBe(data.email); 
    });
    test('User not created->Something went wrong ',async ()=>{
        const data = {
            email:'a@b.com',
            password : '123456'
        };
        // prepare
        (UserRepository.prototype.create).mockReturnValue(()=>{
            throw new Error ('Something went wrong');
        });
        // act
        const userService = new UserService();
        const user = await userService.signup(data).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Something went wrong');
        }); 
    });
});

describe('User get by email',()=>{
    test('get user by email id',async ()=>{
        // prepare
        const data = {
            email:'a@b.com',
            password:'12345'
        };
        (UserRepository.prototype.findBy).mockReturnValue({...data});
        // act
        const userService = new UserService();
        const user = await userService.getUserByEmail('a@b.com');
        // assert
        expect(user.email).toBe('a@b.com');
    });
    test('can not acces the user by its email',async ()=>{
        // prepare
        const data = {
            email:'a@b.com',
            password:'12345'
        };
        (UserRepository.prototype.findBy).mockReturnValue(()=>{
            throw new Error ('Something went wrong');
        });
        // act
        const userService = new UserService();
        const user = await userService.getUserByEmail('a@b.com').catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Something went wrong');
        });
    });
});

describe('User signin',()=>{
    test('User signin successfully',async ()=>{
        const data = {
            email:'a@b.com',
            password:'123456'
        };
        const mockUser = {
            email:'a@b.com',
            password:'hashedPassword',
            comparePassword:jest.fn().mockReturnValue(true),
            genJWT:jest.fn().mockReturnValue('mockToken')
        };
        console.log(mockUser);
        jest.spyOn(UserService.prototype,'getUserByEmail').mockResolvedValue(mockUser);
        // act
        const userService = new UserService();
        const token = await userService.signin(data);
        // assert
        expect(UserService.prototype.getUserByEmail).toHaveBeenCalledWith(data.email);
        expect(mockUser.comparePassword).toHaveBeenCalledWith(data.password);
        expect(mockUser.genJWT).toHaveBeenCalled();
        expect(token).toBe('mockToken');
    });
    test('User email not found',async ()=>{
        const data = {
            email:'notexist@b.com',
            password:'12132'
        };
        jest.spyOn(UserService.prototype,'getUserByEmail').mockResolvedValue(null);
        // act
        const userService = new UserService();
        await expect(userService.signin(data)).rejects.toEqual({
            message:'User not found'
        });
        // assert one more
        expect(UserService.prototype.getUserByEmail).toHaveBeenCalledWith(data.email);
    });
    test('User password not matched',async()=>{
        const data = {
            email:'a@b.com',
            password:'12345'
        };
        const mockUser = {
            email:'a@b.com',
            password:'hashedPassword',
            comparePassword:jest.fn().mockReturnValue(false),
            genJWT:jest.fn()
        };
        jest.spyOn(UserService.prototype,'getUserByEmail').mockResolvedValue(mockUser);
        // act
        const userService = new UserService();
        await expect(userService.signin(data)).rejects.toEqual({
            message : 'Invalid password'
        });
        // assert
        expect(UserService.prototype.getUserByEmail).toHaveBeenCalledWith(data.email);
        expect(mockUser.comparePassword).toHaveBeenCalled();
        expect(mockUser.genJWT).not.toHaveBeenCalled();
    });
    test('something went wrong',async()=>{
        const data = {
            email : 'a@b.com',
            password:'123456'
        };
        const mockUser = {
            email : 'a@b.com',
            password:'hashedPassword',
            comparePassword:jest.fn().mockReturnValue(true),
            genJwt:jest.fn().mockResolvedValue('mockToken')
        };
        jest.spyOn(UserService.prototype,'getUserByEmail').mockImplementation(()=>{
            throw new Error ('Something went wrong');
        });
        // act and assert
        const userService = new UserService();
        const user = await userService.signin(data).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Something went wrong');
        });
    });
});
