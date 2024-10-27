const express = require('express');
const connectDB = require('./config/database.js');

const setupServer = ()=>{
    const app = express();
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
        connectDB();
    });
}

setupServer();