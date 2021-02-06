module.exports = (sequelize, Sequelize) => {
  const recycleType = sequelize.define('recycleType', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recycle_points_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'recyclePoints',
        key: 'id',
      },
    },
    recycle_cities_id: {
      type: Sequelize.INTEGER,
      references: {
        mode: 'recycleCities',
        key: 'id',
      }
    },
    type: {
      type: Sequelize.INTEGER,
    },
  });
  return recycleType;
}
