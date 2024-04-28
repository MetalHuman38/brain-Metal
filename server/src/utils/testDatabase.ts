// import { QueryTypes, Sequelize } from 'sequelize';
// import 'dotenv/config';
// import { waitForDB } from './dbConfig';

// async function getUsers() {
//   try {
//     // Get Sequelize instance from waitForDB
//     const sequelize = await waitForDB();

//     // Execute raw SQL query to fetch users
//     const user = await sequelize.query("SELECT * FROM Users", { type: QueryTypes.SELECT });

//     return user;
//   } catch (error) {
//     throw new Error(`Error getting posts: ${error}`);
//   }
// }

// // Test the getUsers function
// getUsers()
//   .then((user) => {
//     console.log('Users:', user);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

// export default getUsers;