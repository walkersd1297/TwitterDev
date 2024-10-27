const express = require('express');
const connectDB = require('./config/database.js');
const apiRoutes = require('./routes/index.js');

const setupServer = ()=>{
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
        connectDB();
    });
}

setupServer();