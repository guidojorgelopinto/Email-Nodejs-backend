require('dotenv').config()

module.exports = {

  //Config. db
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database:  process.env.DB_DATABASE || "database_development",
    host: process.env.DB_HOST || "127.0.0.1:3306",
    dialect: process.env.DB_DIALECT || "mysql",

    //Config seeds
    seedsStorage: "sequelize",
    seedsStorageTableName: "seeds",

    //Config migrations
    migrationsStorage: "sequelize",
    migrationsStorageTableName: "migrations"


}
