module.exports = (sequelize, Sequelize) => {
  const recycleCities = sequelize.define('recycle_cities', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.TEXT,
    },
    latitude: {
      type: Sequelize.TEXT,
    },
    longitude: {
      type: Sequelize.TEXT,
    },
  });
  return recycleCities;
}
