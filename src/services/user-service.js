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
            console.log("Something went worng in repo file ");
            throw error;
        }
    }
}

module.exports = UserServie;