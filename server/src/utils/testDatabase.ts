import { QueryTypes, Sequelize } from 'sequelize';
import 'dotenv/config';
import { waitForDB } from './dbConfig';

async function getUsers() {
  try {
    // Get Sequelize instance from waitForDB
    const sequelize = await waitForDB();

    // Execute raw SQL query to fetch users
    const users = await sequelize.query("SELECT * FROM User", { type: QueryTypes.SELECT });

    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error}`);
  }
}

// Test the getUsers function
getUsers()
  .then((users) => {
    console.log('User:', users);
  })
  .catch((error) => {
    console.error(error.message);
  });

export default getUsers;
