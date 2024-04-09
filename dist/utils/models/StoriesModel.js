"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
const UserModel_1 = __importDefault(require("./UserModel"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Story extends sequelize_1.Model {
    // Create custom class methods to create a new post
    static async createPost(attributes) {
        return await this.create(attributes);
    }
}
// Define the User model
Story.init({
    StoryID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    ImageURL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
}, // Add a closing curly brace here
{
    sequelize,
    modelName: 'stories',
    tableName: 'Story',
    timestamps: false
});
Story.belongsTo(UserModel_1.default, { foreignKey: 'UserID', as: 'user' });
exports.default = Story;
//# sourceMappingURL=StoriesModel.js.map