const {UserRepository} = require('../repository/index.js');

class UserServie{
    constructor(){
        this.userRepo = new UserRepository(); 
    }

    async signup(data){
        try {
            const user = await this.userRepo.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service file ");
            throw error;
        }
    }

    async getUserByEmail(email){
        try {
            const user = await this.userRepo.findBy({email});
            return user;
        } catch (error) {
            console.log("Something went wrong in service file ");
            throw error;
        }
    }

    async signin(data){
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user){
                throw{
                    message:'User not found'
                };
            }
            if(!user.comparePassword(data.password)){
                throw{
                    message:'Invalid password',
                };
            }
            const token = user.genJWT();
            return token;
        } catch (error) {
            console.log("Something went wrong in service file ");
            throw error;
        }
    }
}

module.exports = UserServie;