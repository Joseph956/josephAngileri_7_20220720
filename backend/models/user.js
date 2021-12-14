module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        attachment: {
            type: Sequelize.STRING,
            default: "./images/profil",
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            required: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        }
    },
        {
            sequelize,
            modelName: 'user'
        });
    return User;
};
