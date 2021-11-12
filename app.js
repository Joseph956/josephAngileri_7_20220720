const express = require('express');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('./models');
// const bodyParser = require("body-parser");
// const cors = require("cors");


//Charge les variables d'environnement.
const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan'); //logs http

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const comentsRoutes = require('./routes/coments');
const likesRoutes = require('./routes/likes');

const app = express();

async function main() {
    await sequelize.sync()
};

// //logger requests/responses.
app.use(morgan('dev'));

//body parser et inclut dans express.json.
app.use(express.json());

// app.use('cors');

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

// Configuration des routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/coments", comentsRoutes);
app.use("/api/likes", likesRoutes);


app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "c' pas bon",
    });
});


// config database Sequelize
const db = require("./models");
const bcrypt = require("bcrypt");
const User = db.user;
const Post = db.posts;
db.sequelize.sync().then(() => {
    initial();
});

// CREATE DEFAULT DATA
function initial() {
    // CREATE FIRST USER (ADMIN)
    User.findOrCreate({
        where: { username: "admin", },
        defaults: {
            username: "admin",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("admin", 4),
        }
    }).then((users) => {
        Post.findOrCreate({
            where: { content: "1er post" },
            defaults: {
                content: "1er post",
                userId: users[0].get('id')
            }
        })
            .catch((err) => {
                console.log(err);
            });
    })
};


module.exports = app;