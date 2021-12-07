module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        }
    }, {
        sequelize,
        modelName: 'role'
    });
    return Role;
};