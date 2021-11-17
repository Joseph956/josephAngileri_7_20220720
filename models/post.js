module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT("long"),
            allowNull: false
        },
        attachment: {
            type: Sequelize.STRING,
            default: "./uploads/post/randon-post.jpg",
            allowNull: true,
        },
    });
    return Post;
};