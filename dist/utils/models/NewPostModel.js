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
class NewPosts extends sequelize_1.Model {
    // Create custom class methods to create a new post
    static async createPost(attributes) {
        return await this.create(attributes);
    }
}
// Define the User model
NewPosts.init({
    PostID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CreatorID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Caption: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ImageURL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Tags: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    Location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    CreatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'NewPosts',
    createdAt: 'CreatedAt',
    timestamps: false
});
// Create foreign key relationship
NewPosts.belongsTo(UserModel_1.default, {
    foreignKey: 'CreatorID',
    targetKey: 'UserID',
    as: 'creator'
});
exports.default = NewPosts;
//# sourceMappingURL=NewPostModel.js.map