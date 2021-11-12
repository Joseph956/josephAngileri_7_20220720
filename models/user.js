
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    attachment: {
      type: Sequelize.STRING,
      default: "./uploads/profil/randon-user.jpg",
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      }
    });
  return User;
};


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.User.hasMany(models.Post);
//     }
//   };
//   User.init({
//     attachment: DataTypes.STRING,
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     isAdmin: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     tableName: 'Users',
//     modelName: 'User',
//   });
//   return User;
// };