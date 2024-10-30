const express = require('express');
const connectDB = require('./config/database.js');
const apiRoutes = require('./routes/index.js');
const passport = require('passport');
const {passportAuth} = require('./config/jwt-middleware.js');
const setupServer = ()=>{
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(passport.initialize());
    passportAuth(passport);
    app.use('/api',apiRoutes);
    app.listen(3000,async ()=>{
        console.log('Server is running on port 3000');
        connectDB();
    });
}

setupServer();