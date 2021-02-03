require('dotenv').config();

module.exports = {
    HOST: process.env.HOST || "localhost",
    USER: process.env.USER ||"postgres",
    PASSWORD: process.env.PASSWORD || "root",
    DBPORT: process.env.DB_PORT || 5432,
    DBNAME: process.env.DBNAME ||"test",
    DIALECT: process.env.DIALECT ||"postgres",
    pool: {
        max: parseInt(process.env.MAX, 10) || 5,
        min: parseInt(process.env.MIN, 10) || 0,
        acquire: parseInt(process.env.ACQUIRE, 10) || 30000,
        idle: parseInt(process.env.IDLE, 10) || 10000
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};
