
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        imgBottom: {
            type: Sequelize.STRING,
        },
        attachment: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
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
        }

    },
        {
            sequelize,
            modelName: 'user',
        });
    return User;
};