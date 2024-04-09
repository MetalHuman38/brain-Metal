import { Sequelize, Dialect } from 'sequelize';
import 'dotenv/config';

interface DBConfig {
    dialect: Dialect;
    host: string;
    username: string;
    password: string;
    database: string;
}

const dbConfig: DBConfig = {
    dialect: 'mariadb', // Specify the dialect as Dialect type
    host: process.env.DATABASE_HOST || 'localhost',
    username: process.env.MARIADB_USER || 'root',
    password: process.env.MARIADB_PASSWORD || 'London1983@@@!',
    database: process.env.MARIADB_DATABASE || 'brainmetal',
};

export function createSequelizeInstance(): Sequelize {
    // Create a new Sequelize instance
    const sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
            host: dbConfig.host,
            dialect: dbConfig.dialect, // Use the dialect directly from dbConfig
            pool: {
                max: 10, // Adjust as needed
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        }
    );

    return sequelize;
}

export default { createSequelizeInstance };
