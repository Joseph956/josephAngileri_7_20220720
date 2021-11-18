'use strict';
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const { required } = require('joi');
dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

//Connexion à la BDD.
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Récupération des modèles.
db.user = require("../models/user")(sequelize, Sequelize);
db.posts = require("../models/post")(sequelize, Sequelize);
db.coments = require("../models/coment")(sequelize, Sequelize);
db.likes = require("../models/like")(sequelize, Sequelize);

//define relationships

// Un utilisateur peut être l'auteur de plusieurs posts.
db.user.hasMany(db.posts, {
  foreignKey: {
    username: 'userId'

  },

  onDelete: "CASCADE",
});

// Un utilisateur peut être l'auteur de plusieurs commentaires.
// db.user.hasMany(db.coments, { foreignKey: 'postId' });

// db.user.hasMany(db.coments, { onDelete: "CASCADE", foreignKey: 'postId' });

// // Un post peut avoir plusieurs commentaires.
// db.posts.hasMany(db.coments, { foreignKey: 'postId' });

// db.posts.hasMany(db.coments, { onDelete: "CASCADE", foreignKey: 'postId' });

// // Un utilisateur peut avoir plusieurs posts.
db.posts.belongsTo(db.user, {
  foreinKey: {
    _id: 'userId',
    allowNull: false,
    required: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

db.user.belongsTo(db.posts, {
  foreinKey: {
    _id: 'postId',
    allowNull: false,
    required: true
  },
  // onDelete: 'CASCADE',
  // onUpdate: 'NO ACTION',
});

db.user.belongsTo(db.coments, {
  foreinKey: {
    _id: 'comentId',
    allowNull: false,
    required: true
  },
  // onDelete: 'CASCADE',
  // onUpdate: 'NO ACTION',
});

// db.user.belongsToMany(db.posts, {
//   // through: models.like,
//   foreignKey: 'userId',
//   otherKey: 'postId',
// });

// db.posts.belongsToMany(db.user, {
//   // through: models.like,
//   foreignKey: 'postId',
//   otherKey: 'userId',
// });

//*********************************************//
//****************Les commentaires*************//
//********************************************//
//Un user peut avoir plusieurs commentaires. 
// db.coments.belongsTo(db.user, {
//   foreinKey: {
//     username: 'userId',
//     allowNull: false
//   },
//   onDelete: 'CASCADE',
//   onUpdate: 'NO ACTION',
// });

// //Un post peut avoir plusieurs commentaires.
// db.coments.belongsTo(db.posts, { onDelete: "CASCADE" });



// db.coments.hasMany(db.user); // Un utilisateur peut être l'auteur de plusieurs coments.
// db.likes.hasMany(db.user); // Un utilisateur peut être l'auteur de plusieurs likes.
// db.user.hasOne(db.posts); // Un post n'a qu'un auteur.
// db.user.hasOne(db.coments); // Un coment n'a qu'un auteur.
// db.posts.belongsTo(db.user); // Un post n'appartient qu'à un utilisateur.
// db.coments.belongsTo(db.user); //Un commentaire n'appartient qu'à un utilisateur.
// db.likes.belongsTo(db.user); //un like n'appartient qu'a un utilisateur.

// db.user.hasOne(db.posts); // Un post n'appartient qu'a un utilisateur.
// db.user.hasOne(db.coments); // Un coment n'appartient qu'a un utilisateur.
module.exports = db;
