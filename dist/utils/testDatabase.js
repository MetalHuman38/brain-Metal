"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbConfig_1 = require("./dbConfig");
async function getUsers() {
    try {
        // Get Sequelize instance from waitForDB
        const sequelize = await (0, dbConfig_1.waitForDB)();
        // Execute raw SQL query to fetch users
        const post = await sequelize.query("SELECT * FROM Posts", { type: sequelize_1.QueryTypes.SELECT });
        return post;
    }
    catch (error) {
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
exports.default = getUsers;
//# sourceMappingURL=testDatabase.js.map