module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        admin: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            required: true,
        },
        user: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            required: true,
        },
    },
        {
            sequelize,
            modelName: 'role'
        });
    return Role;
};