'use strict';
const dotenv = require('dotenv');
dotenv.config();
// const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//Connexion à la BDD.
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
};

//Vérification de réussite ou d'échec.
sequelize.authenticate().then(() => {
  console.log("Connexion réussie");
}).catch((err) => {
  console.log("Erreur de connection à la BDD !");
});


// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


//Récupération des modèles.
db.user = require("../models/users_table")(sequelize, Sequelize);
db.posts = require("../models/posts_table")(sequelize, Sequelize);
// db.coments = require("../models/coments_table")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


//define relationships
db.user.hasOne(db.posts); // Un post n'appartient qu'a un utilisateur.
// db.user.hasOne(db.coments); // Un coment n'appartient qu'a un utilisateur.
db.posts.belongsTo(db.user); // Un utilisateur peut avoir plusieurs posts.
// db.coments.belongsTo(db.posts); //Un post peut avoir plusieurs commentaires.

module.exports = db;
