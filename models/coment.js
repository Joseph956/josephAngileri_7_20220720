module.exports = (sequelize, Sequelize) => {
  const Coment = sequelize.define("coment", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idusers: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    idposts: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    pseudo: {
      type: Sequelize.TEXT("long"),
      max: 36,
      allowNull: false
    },
    coment: {
      type: Sequelize.TEXT("long"),
      allowNull: false
    },

  });

  return Coment;
};






// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Coment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.Coment.belongsTo(models.User, {
//         foreignKey: {
//           allowNull: false,
//         }
//       })
//     }
//   };
//   Coment.init({
//     idusers: DataTypes.INTEGER,
//     idposts: DataTypes.INTEGER,
//     pseudo: DataTypes.STRING,
//     coment: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Coment',
//   });
//   return Coment;
// };