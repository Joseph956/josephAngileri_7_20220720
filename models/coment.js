module.exports = (sequelize, Sequelize) => {
    const Coment = sequelize.define("coment", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
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
        // t'as pas besoin de défninir les idUsers, idPosts ici.

    });

    return Coment;
};