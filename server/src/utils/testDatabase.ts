import { QueryTypes, Sequelize } from 'sequelize';
import 'dotenv/config';
import { waitForDB } from './dbConfig';

async function getUsers() {
  try {
    // Get Sequelize instance from waitForDB
    const sequelize = await waitForDB();

    // Execute raw SQL query to fetch users
    const post = await sequelize.query("SELECT * FROM Posts", { type: QueryTypes.SELECT });

    return post;
  } catch (error) {
    throw new Error(`Error getting posts: ${error}`);
  }
}

// Test the getUsers function
getUsers()
  .then((post) => {
    console.log('Posts:', post);
  })
  .catch((error) => {
    console.error(error.message);
  });

export default getUsers;