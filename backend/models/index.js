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


/************************************
************relation users***********
************************************/
db.user.hasMany(db.posts, {// Un utilisateur peut être l'auteur de plusieurs posts.
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});
db.user.hasMany(db.coments, {// Un utilisateur peut être l'auteur de plusieurs coments.
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});
db.user.hasMany(db.likes, {// Un utilisateur peut être l'auteur de plusieurs likes.
  // C'est une relation (un à +) clé étrangère définie dans le modèle cible.
  foreignKey: {
    name: 'userId',
    through: db.likes,
    allowNull: false
  },
  onDelete: 'CASCADE'
});
/*****************************************
**************relation posts**************
*****************************************/
db.posts.belongsTo(db.user, { //Un post appartient à un seul utilisateur.
  foreignKey: {
    //Relation (un à un) clé étrangère définie dans le modèle source (db.posts).
    name: 'userId',
    allowNull: false
  },
  otherKey: 'postId',
  through: db.likes,
  onDelete: 'CASCADE',
});

db.posts.belongsToMany(db.user, { //Plusieurs posts peuvent appartenir à plusieurs users et inversement.
  foreignKey: {
    //Relation (+ à +), utilise une table de jonction qui contient les clés étrangères 
    name: 'postId',
    allowNull: false
  },
  otherKey: 'userId',
  through: db.likes,
  onDelete: 'CASCADE',
});

db.posts.hasMany(db.coments, {//Un post peut avoir plusieurs commentaires.
  foreignKey: {
    //Relation un à plusieurs clé étrangère définie dans le modèle cible (db.coments).
    name: 'postId',
    through: db.coments,
    allowNull: false
  },
  onDelete: 'CASCADE'
});

db.posts.hasMany(db.likes, {//Un post peut avoir plusieurs likes.
  foreignKey: {
    //Relation un à plusieurs clé étrangère définie dans le modèle cible (db.likes).
    name: 'postId',
    through: db.likes,
    allowNull: false
  },
  onDelete: 'CASCADE'
});
/*****************************************
*****Relation commentaires ***************
******************************************/
db.coments.belongsTo(db.posts, { //Un coment appartient à un seul post.
  foreignKey: {
    // Relation(un à un) clé étrangère définie dans le modèle source(db.coments).
    name: 'postId',
    as: 'post',
    allowNull: false
  },
  otherKey: 'comentId',
  through: db.coments,
  onDelete: 'CASCADE'
});
db.coments.belongsTo(db.user, { //Un coment appartient à un seul utilisateur.
  foreignKey: {
    // Relation(un à un) clé étrangère définie dans le modèle source(db.coments).
    name: 'userId',
    as: 'user',
    allowNull: false
  },
  otherKey: 'comentId',
  through: db.coments,
  onDelete: 'CASCADE'
});
/*****************************************
**************relation likes**************
*****************************************/
db.likes.belongsTo(db.user, {//plusieurs likes peuvent appartenir à un seul utlisateur.
  foreignKey: {
    name: 'userId',
    as: 'user',
    allowNull: false
  },
  through: db.likes,
  onDelete: 'CASCADE'
});

db.likes.belongsTo(db.posts, {//Plusieurs likes peuvent appartenir à un seul post.
  foreignKey: {
    name: 'postId',
    as: 'post',
    allowNull: false
  },
  through: db.likes,
  onDelete: 'CASCADE'
});
/******************************************
 * *********Fin relation likes************
 *****************************************/

//Les rôles
db.role.hasMany(db.user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.belongsTo(db.role, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// On veux maintenant créer une relation entre ces 2 tables.L’utilisateur à un et un seul rôle.Pour cela il suffit d’ajouter la ligne suivante:

// User.belongsTo(Role);//l'utilisateur à un rôle.
// Cela va créer un champ « role_id » dans la table « user » (roleId si on laisse la configuration « underscored » à false par default).
// Pour générer ces tables on peux utiliser la ligne suivante(tables générées seulement si elles n’existent pas)

//define relationships

//hasOne relation un à un (La clé étrangère est définie dans le modèle cible).
// db.user.hasOne(db.posts); // Un post n'a qu'un auteur.
// db.user.hasOne(db.coments); // Un coment n'a qu'un auteur.
// db.user.hasOne(db.likes); // Un like n'a qu'un auteur.


// //belongsTo relation un à un (La clé étrangère est définie dans le modèle source).
// db.user.belongsTo(db.posts); // Un post n'a qu'un auteur.
// db.user.belongsTo(db.coments); // Un coment n'a qu'un auteur.
// db.user.belongsTo(db.likes); // Un like n'a qu'un auteur.
// db.posts.belongsTo(db.user); // Un post n'appartient qu'à un utilisateur.
// db.coments.belongsTo(db.user); //Un commentaire n'appartient qu'à un utilisateur.
// db.likes.belongsTo(db.user); //un like n'appartient qu'a un utilisateur.



// //hasMany relation un à plusieurs (La clé étrangère est définie dans le modèle cible).
// db.user.hasMany(db.posts); // Un user est l'auteur de plusieurs posts.
// db.user.hasMany(db.coments); // Un user est l'auteur de plusieurs coments.
// db.user.hasMany(db.likes); // Un user est l'auteur de plusieurs likes.
// db.coments.hasMany(db.user); // Un utilisateur peut être l'auteur de plusieurs coments.
// db.likes.hasMany(db.user); // Un utilisateur peut être l'auteur de plusieurs likes.










// db.user.hasOne(db.posts); // Un post n'appartient qu'a un utilisateur.
// db.user.hasOne(db.coments); // Un coment n'appartient qu'a un utilisateur.
module.exports = db;
