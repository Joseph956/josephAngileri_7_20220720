module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,

        },
        imgBottom: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        attachment: {
            type: Sequelize.STRING,
            allowNull: true,
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
            validate: {
                isEmail: true,
                async ensureEmailIsUnique(email) {
                    if (await User.findOne({ where: { email } }))
                        throw new Error('Cette adresse email est déjà utilisée !!!')
                },
            },
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
