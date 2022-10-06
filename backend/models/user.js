
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
        },

        password: {
            type: Sequelize.STRING,
        }

    },
        {
            sequelize,
            modelName: 'user',
        },
        {
            tableName: 'users',
            hooks: {
                beforeCreate: (record, options) => {
                    record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, 'DD/MM/YYYY');
                    record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, 'DD/MM/YYYY');
                },
                beforeUpdate: (record, options) => {
                    record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, 'DD/MM/YYYY');
                }
            }

        }
    );
    return User;
};