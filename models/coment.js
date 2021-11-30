module.exports = (sequelize, Sequelize) => {
    const Coment = sequelize.define("coment", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        coment: {
            type: Sequelize.TEXT("long"),
            allowNull: false
        },
    });

    return Coment;
};