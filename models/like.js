module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        // je ne comprends pas ce que tu veux sauvegarder dans ces champs la, on en parlera la prochaine fois.
        likes: {
            type: Sequelize.STRING,
            get() {
                return this.getDataValue("likes")
                    ? this.getDataValue("likes").split(";")
                    : [];
            },
            set(val) {
                this.setDataValue("likes", val.join(";"));
            },
        },
        dislikes: {
            type: Sequelize.STRING,
            get() {
                return this.getDataValue("dislikes")
                    ? this.getDataValue("dislikes").split(";")
                    : [];
            },
            set(val) {
                this.setDataValue("dislikes", val.join(";"));
            },
        },
    });

    return Like;
};