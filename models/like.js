
module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idposts: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    likes: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue("likes")
          ? this.getDataValue("likes").split(";")
          : [];
      },
      set(val) {
        this.setDataValue("likes", val.join(";"));
      },
    },
    dislikes: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue("dislikes")
          ? this.getDataValue("dislikes").split(";")
          : [];
      },
      set(val) {
        this.setDataValue("dislikes", val.join(";"));
      },
    },
  });

  return Like;
};





// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Like extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.Like.belongsTo(models.Post, {
//         foreignKey: {
//           allowNull: false,
//         }
//       })
//     }
//   };
//   Like.init({
//     idposts: DataTypes.INTEGER,
//     likes: DataTypes.INTEGER,
//     dislikes: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Like',
//   });
//   return Like;
// };