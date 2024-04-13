import { QueryTypes, Sequelize } from 'sequelize';
import 'dotenv/config';
import { waitForDB } from './dbConfig';

async function getUsers() {
  try {
    // Get Sequelize instance from waitForDB
    const sequelize = await waitForDB();

    // Execute raw SQL query to fetch users
    const posts = await sequelize.query("SELECT * FROM Posts", { type: QueryTypes.SELECT });

    return posts;
  } catch (error) {
    throw new Error(`Error getting post: ${error}`);
  }
}

// Test the getUsers function
export async function testQueryExecution() {
  const users = await getUsers();
  console.log(users);
}

// Test the getUsers function
getUsers()
  .then((posts) => {
    console.log('Post:', posts);
  })
  .catch((error) => {
    console.error(error.message);
  });



