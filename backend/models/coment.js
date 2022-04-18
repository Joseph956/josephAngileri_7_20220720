module.exports = (sequelize, Sequelize) => {
    const Coment = sequelize.define("coment", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        coment: {
            type: Sequelize.TEXT("long"),
        },
    });

    return Coment;
};