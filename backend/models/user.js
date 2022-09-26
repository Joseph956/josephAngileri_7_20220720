
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
            allowNull: false,
            required: true,
            unique: true,
            validate: {
                isEmail: true,
                async emailSchema(email) {
                    if (await User.findOne({ where: { email } }))
                        throw new Error("Un compte utilisateur existe avec cette adresse mail !!!")
                }
            }
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