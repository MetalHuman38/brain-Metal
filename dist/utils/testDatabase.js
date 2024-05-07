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
        const user = await sequelize.query("SELECT * FROM Users", { type: sequelize_1.QueryTypes.SELECT });
        return user;
    }
    catch (error) {
        throw new Error(`Error getting user: ${error}`);
    }
}
// Test the getUsers function
getUsers()
    .then((user) => {
    console.log('Users:', user);
})
    .catch((error) => {
    console.error(error.message);
});
exports.default = getUsers;
//# sourceMappingURL=testDatabase.js.map