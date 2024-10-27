const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/twitter-dev')
            .then(()=> console.log('Connected to MongoDB'))
            .catch((error)=> console.log(error));
    
}

module.exports = connectDB;