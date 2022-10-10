const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('./models');
const dotenv = require('dotenv');

dotenv.config();
require('./config/config');

const morgan = require('morgan'); //logs http
const helmet = require('helmet');
const xssclean = require('xss-clean');
const noCache = require('nocache');
const cors = require('cors');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//Import des routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const comentsRoutes = require('./routes/coments');

//lancement du framework d'application Web
const app = express();


app.use(cors());
app.disable('x-powered-by');
app.use(xssclean());
app.use(helmet());
app.use(noCache());

// //logger requests/responses.
app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));

//Parse le body des requêtes .json
//Inclut à partir de la version 4.17 express
//Utilisation de .json pour récupération de paramétres.
app.use(express.json());
//Pour encoder le contenu.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

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

// stocke le jeton "JWT" dans la session.
app.use(session({
    name: "sessionId",
    secret: process.env.COOKIE_SESSION,
    secure: true, //garantie que le navigateur envoie le cookie sur https uniquement.
    httpOnly: true, //Evite les attaques Cross-site-scripting.
    cookie: { maxAge: 600000 }//jeton stocké pendant 10 min
}));


// Configuration et enregistrement des routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/coments", comentsRoutes);

//Middleware permettant l'accès statique des images
app.use("/images", express.static(path.join(__dirname, "images")));

//Gestion des erreurs serveur (dev)
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "erreur serveur jo",
    });
});


// config database Sequelize
const db = require("./models");
const bcrypt = require("bcrypt");
const User = db.user;
const Post = db.posts;
const Role = db.role;
db.sequelize.sync().then(() => {
    initial();
});

// CREATE DEFAULT DATA
function initial() {
    // CREATE USER ROLE;
    Role.findOrCreate({
        where: { role: "user" },
        defaults: {
            role: "user"
        }
    });
    // CREATE ADMIN ROLE;
    Role.findOrCreate({
        where: { role: "admin" },
        defaults: {
            role: "admin"
        }
    }).then(createdRole => {
        // CREATE FIRST USER (ADMIN)
        User.findOrCreate({
            where: { email: "admin@gmail.com", },
            defaults: {
                username: "admin",
                email: "admin@gmail.com",
                password: bcrypt.hashSync("Admin4548$", 4),
                roleId: createdRole[0].id
            }
        }).then(users => {
            Post.findOrCreate({
                where: {
                    title: "1er post",
                    content: "Description du 1er post",
                },
                defaults: {
                    title: "1er post",
                    content: "Description du 1er post",
                    userId: users[0].get('id')
                }
            }).catch((err) => { console.log(err) });
        })
    });
};


module.exports = app;