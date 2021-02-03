module.exports = (sequelize, Sequelize) => {
  const recyclePoints = sequelize.define('recyclePoints', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recycle_cities_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'recycleCities',
        key: 'id',
      },
    },
    name: {
      type: Sequelize.TEXT,
    },
    address: {
      type: Sequelize.TEXT,
    },
    latitude: {
      type: Sequelize.TEXT,
    },
    longitude: {
      type: Sequelize.TEXT,
    },
  });
  return recyclePoints;
}
