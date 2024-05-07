"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
const UserModel_1 = __importDefault(require("./UserModel"));
const PostModels_1 = __importDefault(require("./PostModels"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class NewPosts extends sequelize_1.Model {
    // Create custom class methods to create a new post
    static async createPost(attributes) {
        return await this.create(attributes);
    }
    // Create custom class to Update ImageURL column in NewPost Table
    static async updateImageURL(NewPostID, ImageURL) {
        const post = await this.findByPk(NewPostID);
        if (post) {
            post.ImageURL = ImageURL;
            await post.save();
        }
        return post;
    }
    // Create Static method to fetch all new posts by ID
    static async getNewPostByID(NewPostID) {
        return await this.findByPk(NewPostID);
    }
}
// Define the User model
NewPosts.init({
    NewPostID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
}, {
    sequelize,
    tableName: 'NewPosts',
    createdAt: 'CreatedAt',
    timestamps: false
});
// Create a new hook to save NewPost details to Post Table useing Post attribute
NewPosts.afterCreate(async (newPost, options) => {
    await PostModels_1.default.create({
        PostID: newPost.NewPostID,
        Caption: newPost.Caption,
        ImageURL: newPost.ImageURL,
        Location: newPost.Location,
        Tags: newPost.Tags,
        CreatedAt: newPost.CreatedAt,
    });
});
// Create foreign key relationship
NewPosts.belongsTo(UserModel_1.default, { foreignKey: 'NewPostID',
    targetKey: 'UserID',
    as: 'creator' });
exports.default = NewPosts;
//# sourceMappingURL=NewPostModel.js.map