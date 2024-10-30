const UserService  = require('../services/user-service.js');
const userService = new UserService();

const signup = async(req,res)=>{
    try {
        const user = await userService.signup({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        res.status(200).json({
            data:user,
            message:'User created',
            success:true,
            err:{}
        });
    } catch (error) {
        res.status(500).json({
            data:{},
            message:'Internal server error',
            err:error,
            success:false
        });
    }
}

module.exports = {
    signup,
}