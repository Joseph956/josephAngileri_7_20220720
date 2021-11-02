const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");


// //Charge les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan'); //logs http

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

const app = express();

// //logger requests/responses
app.use(morgan('dev'));

app.use(express.json());

//Configuration des cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "c' pas bon",
    });
});

module.exports = app;