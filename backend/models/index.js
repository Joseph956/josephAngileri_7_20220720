'use strict';
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
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
db.role = require("../models/role")(sequelize, Sequelize);

//define relationships
//hasMany (relation un à plusieurs).
//belongsTo (relation plusieurs à un).


db.user.hasMany(db.posts, { // Un utilisateur peut être l'auteur de plusieurs posts.
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

db.posts.belongsTo(db.user, { //Plusieurs posts peuvent appartenir à un seul utilisateur.
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE',
});

db.posts.belongsToMany(db.user, { //Plusieurs posts peuvent appartenir à un seul utilisateur.
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  through: db.likes,
  onDelete: 'CASCADE',
  allowNull: false
});

db.posts.hasMany(db.coments, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }); //Un post peut avoir plusieurs commentaires.
db.coments.belongsTo(db.posts, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }); //Plusieurs coments peuvent appartenir à un seul post.

db.user.hasMany(db.coments, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }); // Un utilisateur peut être l'auteur de plusieurs coments.
db.coments.belongsTo(db.user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });  //Plusieurs coments peuvent appartenir à un seul utilisateur.

db.user.hasMany(db.likes, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });  // Un utilisateur peut être l'auteur de plusieurs likes.
db.likes.belongsTo(db.user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }); //plusieurs likes peuvent appartenir à un seul utlisateur.

db.posts.hasMany(db.likes, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });   //Un post peut avoir plusieurs likes.
db.likes.belongsTo(db.posts, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }); //Plusieurs likes peuvent appartenir à un seul post.

//Les rôles
db.role.hasMany(db.user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.belongsTo(db.role, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });


//define relationships

//relation un à un (La clé étrangère est définie dans le modèle cible).
// db.user.hasOne(db.posts); // Un post n'a qu'un auteur.
// db.user.hasOne(db.coments); // Un coment n'a qu'un auteur.
// db.user.hasOne(db.likes); // Un like n'a qu'un auteur.

// //relation un à un (La clé étrangère est définie dans le modèle source).
// db.user.belongsTo(db.posts); // Un post n'a qu'un auteur.
// db.user.belongsTo(db.coments); // Un coment n'a qu'un auteur.
// db.user.belongsTo(db.likes); // Un like n'a qu'un auteur.

// //relation un à plusieurs (La clé étrangère est définie dans le modèle cible).
// db.user.hasMany(db.posts); // Un user est l'auteur de plusieurs posts.
// db.user.hasMany(db.coments); // Un user est l'auteur de plusieurs coments.
// db.user.hasMany(db.likes); // Un user est l'auteur de plusieurs likes.

// db.coments.hasMany(db.user); // Un utilisateur peut être l'auteur de plusieurs coments.
// db.likes.hasMany(db.user); // Un utilisateur peut être l'auteur de plusieurs likes.
// db.posts.belongsTo(db.user); // Un post n'appartient qu'à un utilisateur.
// db.coments.belongsTo(db.user); //Un commentaire n'appartient qu'à un utilisateur.
// db.likes.belongsTo(db.user); //un like n'appartient qu'a un utilisateur.

// db.user.hasOne(db.posts); // Un post n'appartient qu'a un utilisateur.
// db.user.hasOne(db.coments); // Un coment n'appartient qu'a un utilisateur.
module.exports = db;
