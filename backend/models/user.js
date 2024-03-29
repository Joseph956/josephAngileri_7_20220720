
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
            validator: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
        },

    })
    return User;
};