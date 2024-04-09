"use strict";
console.log('Hello World');
// import dbConfig from './dbConfig';
// import { Sequelize, DataTypes } from 'sequelize';
// import 'dotenv/config';
// // Create a new Sequelize instance
// const sequelize = new Sequelize( 
//     dbConfig.database, 
//     dbConfig.user, 
//     dbConfig.password,
//     {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle,
//     },
// });
// // Test the connection
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((error) => {
//         console.error('Unable to connect to the database:', error);
//     });
// // Define the DB object
// interface DB {
//     Sequelize: typeof Sequelize;
//     sequelize: Sequelize;
// }
// // Export the DB object
// const db: DB = {
//     Sequelize: Sequelize, // Assign the correct value to the Sequelize property
//     sequelize: new Sequelize
// };
// // Add the sequelize property to the db object
// db.sequelize = sequelize;
// // Export the db object
// db.sequelize.sync({ force: false })
//         .then(() => {
//                 console.log("Drop and re-sync db.");
//         });
// // Export the db object
// export default db; 
//# sourceMappingURL=index.js.map