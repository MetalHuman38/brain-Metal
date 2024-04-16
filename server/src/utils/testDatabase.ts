import { QueryTypes, Sequelize } from 'sequelize';
import 'dotenv/config';
import { waitForDB } from './dbConfig';

async function getUsers() {
  try {
    // Get Sequelize instance from waitForDB
    const sequelize = await waitForDB();

    // Execute raw SQL query to fetch users
<<<<<<< HEAD
    const posts = await sequelize.query("SELECT * FROM Posts", { type: QueryTypes.SELECT });

    return posts;
=======
    const post = await sequelize.query("SELECT * FROM Posts", { type: QueryTypes.SELECT });

    return post;
>>>>>>> 58fd192 (FileUpload-Complete)
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
<<<<<<< HEAD
  .then((posts) => {
    console.log('Post:', posts);
=======
  .then((post) => {
    console.log('Posts:', post);
>>>>>>> 58fd192 (FileUpload-Complete)
  })
  .catch((error) => {
    console.error(error.message);
  });



