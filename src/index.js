const express = require('express');
const connectDB = require('./config/database.js');
const routes = require('./routes/index.js');

const setupServer = ()=>{
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/api',routes);
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
        connectDB();
    });
}

setupServer();