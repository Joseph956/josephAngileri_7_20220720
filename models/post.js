module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        // ta pas besoin d'IdUser on va définir la relation ailleur.
        pseudo: {
            type: Sequelize.TEXT("long"),
            allowNull: false
        },
        // pareil pour les likes
        content: {
            type: Sequelize.TEXT("long"),
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