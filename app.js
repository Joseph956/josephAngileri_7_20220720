const express = require('express');
// const mysql = require('mysql2');


// //Charge les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan'); //logs http

const usersRoutes = require('./routes/authUsers.js');
const fichesRoutes = require('./routes/fichesUsers');
const postsRoutes = require('./routes/postsUsers');

const app = express();

// //logger requests/responses
app.use(morgan('dev'));

app.use(express.json());

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

app.use("/api/authUsers", usersRoutes);
app.use("/api/fichesUsers", fichesRoutes);
app.use("/api/postsUsers", postsRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "c' pas bon",
    });
});

module.exports = app;