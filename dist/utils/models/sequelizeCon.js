"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSequelizeInstance = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbConfig = {
    dialect: 'mariadb', // Specify the dialect as Dialect type
    host: process.env.DATABASE_HOST || 'localhost',
    username: process.env.MARIADB_USER || 'root',
    password: process.env.MARIADB_PASSWORD || 'London1983@@@!',
    database: process.env.MARIADB_DATABASE || 'brainmetal',
};
function createSequelizeInstance() {
    // Create a new Sequelize instance
    const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect, // Use the dialect directly from dbConfig
        pool: {
            max: 10, // Adjust as needed
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    });
    return sequelize;
}
exports.createSequelizeInstance = createSequelizeInstance;
exports.default = { createSequelizeInstance };
//# sourceMappingURL=sequelizeCon.js.map