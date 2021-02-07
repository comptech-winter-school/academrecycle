module.exports = (sequelize, Sequelize) => {
  const recycleType = sequelize.define('recycle_types', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recycle_points_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'recycle_points',
        key: 'id',
      },
    },
    recycle_cities_id: {
      type: Sequelize.INTEGER,
      references: {
        mode: 'recycle_cities',
        key: 'id',
      }
    },
    type: {
      type: Sequelize.INTEGER,
    },
  });
  return recycleType;
}
