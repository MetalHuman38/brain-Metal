"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Saves extends sequelize_1.Model {
    // Create custom class methods to create a new post
    static async createSave(attributes) {
        return await this.create(attributes);
    }
}
// Define the Saves model
Saves.init({
    SaveID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    PostID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    SaveDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'Saves',
});
exports.default = Saves;
//# sourceMappingURL=Saves.js.map