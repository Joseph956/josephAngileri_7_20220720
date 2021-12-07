module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        likes: {
            type: Sequelize.STRING,
        },
        dislikes: {
            type: Sequelize.STRING,
        },
    });

    return Like;
};