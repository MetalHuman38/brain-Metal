"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Posts extends sequelize_1.Model {
    static async findUserPost(PostID) {
        return await this.findByPk(PostID);
    }
    static async findAllUserPosts(PostID) {
        return await this.findAll({
            where: {
                PostID: PostID
            },
        });
    }
}
// Define the User model
Posts.init({
    PostID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Likes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Caption: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Tags: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ImageURL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
    UpdatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'Posts',
    updatedAt: 'UpdatedAt',
    createdAt: 'CreatedAt',
    timestamps: false
});
// Create hook to fetch PostBy primaryKey
exports.default = Posts;
//# sourceMappingURL=PostModels.js.map