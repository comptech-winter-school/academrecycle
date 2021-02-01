module.exports = (sequelize, Sequelize) => {
    const recyclePoints = sequelize.define("recyclePoints", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recyclemap_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT
        },
        latitude: {
            type: Sequelize.TEXT
        },
        longitude: {
            type: Sequelize.TEXT
        },
    });
    return recyclePoints;
}
