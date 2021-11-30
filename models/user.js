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
            default: "./uploads/profil/randon-user.jpg",
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
            // defaultScope: {
            //     attributes: { exclude: ['password'] },
            // },
            sequelize,
            modelName: 'user'
        });
    return User;
};
