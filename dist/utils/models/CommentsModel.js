"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Comment extends sequelize_1.Model {
    // Create custom class methods to create a new comment
    static async createPost(attributes) {
        return await this.create(attributes);
    }
}
// Define the User model
Comment.init({
    CommentID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Desc: {
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
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: false
});
// Define the relationship between the User and Comment models
// Comment.belongsTo(Users, { foreignKey: 'UserID', as: 'user' });
exports.default = Comment;
//# sourceMappingURL=CommentsModel.js.map