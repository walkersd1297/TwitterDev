const JWT = require('passport-jwt');
const User = require('../models/user.js');

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'twitter-secret',
}


// Logic for validating the token
const passportAuth = (passport)=>{
    passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{
        const user = await User.findById(jwt_payload.id);
        if(!user){
            return done(null,false);
        } else{
            return done(null,user);
        }
    }));
}

module.exports = {
    passportAuth
}