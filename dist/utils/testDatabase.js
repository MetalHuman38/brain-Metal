"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testQueryExecution = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbConfig_1 = require("./dbConfig");
async function getUsers() {
    try {
        // Get Sequelize instance from waitForDB
        const sequelize = await (0, dbConfig_1.waitForDB)();
        // Execute raw SQL query to fetch users
        const posts = await sequelize.query("SELECT * FROM Posts", { type: sequelize_1.QueryTypes.SELECT });
        return posts;
    }
    catch (error) {
        throw new Error(`Error getting post: ${error}`);
    }
}
// Test the getUsers function
async function testQueryExecution() {
    const users = await getUsers();
    console.log(users);
}
exports.testQueryExecution = testQueryExecution;
// Test the getUsers function
getUsers()
    .then((posts) => {
    console.log('Post:', posts);
})
    .catch((error) => {
    console.error(error.message);
});
//# sourceMappingURL=testDatabase.js.map