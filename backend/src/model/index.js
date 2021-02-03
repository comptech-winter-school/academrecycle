require('dotenv').config();
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DBNAME, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.DBPORT,
  operatorsAliases: 1,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize.sync().then((result) => {
  console.log(result);
})
  .catch((err) => console.log(err));
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.recyclePoints = require('./recyclePoints.model.js')(sequelize, Sequelize);
db.recycleCities = require('./recycleCities.model.js')(sequelize, Sequelize);
db.recycleType = require('./recycleType.model.js')(sequelize, Sequelize);

module.exports = db;
