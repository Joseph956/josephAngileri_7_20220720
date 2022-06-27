module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("unlike", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        unlikes: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Like;
};