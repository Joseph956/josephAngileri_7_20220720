
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    idusers: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    pseudo: {
      type: Sequelize.TEXT("long"),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT("long"),
      allowNull: false
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    attachment: {
      type: Sequelize.STRING,
      default: "./uploads/post/randon-post.jpg",
      allowNull: false,
    },
  });
  return Post;
};


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.Post.belongsTo(models.User, {
//         foreignKey: {
//           allowNull: false,
//         }
//       })
//     }
//   };
//   Post.init({
//     idusers: DataTypes.INTEGER,
//     attachment: DataTypes.STRING,
//     pseudo: DataTypes.STRING,
//     content: DataTypes.STRING,
//     likes: DataTypes.INTEGER
//   }, {
//     sequelize,
//     tableName: 'Posts',
//     modelName: 'Post',
//   });
//   return Post;
// };