// const sequelize = require('sequelize');
// const { DataTypes } = Sequelize;
const path = require('path');

// Définir le modèle Sequelize de l'utilisateur dans la base de donnée Mysql
// et de permettre Sequelize d'écrire les fonctions CRUD
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    // picture: {
    //   type: Sequelize.STRING,
    //   default: "./uploads/profil/randon-user.png"
    // },
    // post: {
    //   type: Sequelize.STRING,
    //   max: 1024
    // },
    // //followers = id des personnes qui suivent l'utilisateur.
    // followers: {
    //   type: [Sequelize.STRING]
    // },
    // //following = id des personnes suivi par l'utilisateur.
    // following: {
    //   type: [Sequelize.STRING]
    // },
    // //id des likes fait par l'user (évite de liker plusieurs fois la même chose).
    // Likes: {
    //   type: [Sequelize.STRING]
    // },
  });

  // const User = URLSearchParams.build({ username, email, password });
  User.sync({ alter: true }).then(() => {
    // class User {
    //   constructor(username, email, password) {
    //     this.username = username;
    //     this.email = email;
    //     this.password = password;
    //   }
    // };
    //Travailler avec notre table mise à jour.
    return User.bulkCreate([{
      username: 'andré',
      email: User.email,
      password: User.password,
      // WittCodeRocks: false
    }]);
    // user.username = 'Volverine';
    // return user.save();
  }).then((data) => {
    // console.log(data.toJSON());
    console.log("Un utilisateur ajouté dans la BDD !!!");
    // data.username = 'pizza';
    return data.save({ fields: ['username'] });
  }).then((data) => {
    console.log("User mis à jour !");
    console.log(data.toJSON());
  }).catch((err) => {
    console.log("erreur de synchronisation de la table et du modèle !!!!!");
  });

  return User;
};
