
/*
* TODO
* write correct settings for DB
* */
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWRD: "root",
    DB: "test",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
