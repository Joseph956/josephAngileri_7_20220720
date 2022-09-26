
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.TEXT("long"),
        },
        attachment: {
            type: Sequelize.STRING,
        },
    });

    return Post;
};