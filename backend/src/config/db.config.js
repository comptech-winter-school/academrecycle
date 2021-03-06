require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DBUSER || 'postgres',
    password: process.env.DBPASSWORD || 'root',
    database: process.env.DBNAME || 'test',
    host: process.env.DBHOST || 'localhost',
    dialect: 'postgresql',
  },
  DBHOST: process.env.DBHOST || 'localhost',
  DBUSER: process.env.DBUSER || 'postgres',
  DBPASSWORD: process.env.DBPASSWORD || 'root',
  DBPORT: process.env.DBPORT || 5432,
  DBNAME: process.env.DBNAME || 'test',
  DIALECT: process.env.DIALECT || 'postgres',
  pool: {
    max: parseInt(process.env.MAX, 10) || 5,
    min: parseInt(process.env.MIN, 10) || 0,
    acquire: parseInt(process.env.ACQUIRE, 10) || 30000,
    idle: parseInt(process.env.IDLE, 10) || 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
