require('dotenv').config();
const Sequelize = require('sequelize');
const fs = require('fs');
const dbConfig = require('./config/db.config.js');

const sequelize = new Sequelize(`postgres://${dbConfig.DBUSER}:${dbConfig.DBPASSWORD}@${dbConfig.DBHOST}:${dbConfig.DBPORT}/${dbConfig.DBNAME}`, {
  dialect: dbConfig.DIALECT,
  operatorsAliases: 1,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const queryInterface = sequelize.getQueryInterface();

fs.readdir('./', (err, files) => {
  files
    .filter((file) => file.substr(-5) === '.json')
    .forEach((file) => {
      fs.readFile(file, 'utf-8', (err, contents) => {
        ParseFile(contents, file.split('.').slice(0, -1).join('.'));
        fs.unlinkSync(file);
      });
    });
});

function get_city_id(filename) {
  const cities_id_array = {
    1: 'Омск',
    2: 'Санкт-Петербург',
    3: 'Красноярск',
    4: 'Москва',
    5: 'Новосибирск',
  };
  for (key in cities_id_array) {
    if (cities_id_array[key] === filename) {
      return key;
    }
  }
  return undefined;
}

function ParseFile(contents, filename) {
  const JsonData = JSON.parse(contents.toString());
  const id_city_for_db = get_city_id(filename);
  if (id_city_for_db === undefined) {
    console.log('Error in select query from cities database');
    return;
  }
  for (const [key, value] of Object.entries(JsonData)) {
    setTimeout(() => {
      queryInterface.bulkInsert('recycle_points', [{
        recycle_cities_id: id_city_for_db,
        recyclemap_id: value.id,
        name: value.title,
        latitude: value.lat,
        longitude: value.lng,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {
        returning: ['id'],
        plain: true,
      })
        .then((result) => RecycleTypeQuery(result.id, id_city_for_db, value.content_text));
    }, 500);
  }
}

function RecycleTypeQuery(point_id, city_id, type) {
  for (const value of type.split(', ')) {
    setTimeout(() => {
      queryInterface.bulkInsert('recycle_types', [{
        recycle_cities_id: city_id,
        recycle_points_id: point_id,
        type: value,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]).catch((err) => console.log(err));
    }, 500);
  }
}
