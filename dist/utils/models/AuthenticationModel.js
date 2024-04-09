"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Authentication extends sequelize_1.Model {
    // Create custom class methods to create a new post
    static async createAuthentication(attributes) {
        return await this.create(attributes);
    }
}
Authentication.init({
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    hashedPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, // Pass the Sequelize instance
    modelName: 'Authentication', // Set the model name
    tableName: 'Authentication', // Set the table name
});
exports.default = Authentication;
//# sourceMappingURL=AuthenticationModel.js.map