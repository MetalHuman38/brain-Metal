"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
const UserModel_1 = __importDefault(require("./UserModel"));
const NewPostModel_1 = __importDefault(require("./NewPostModel"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class ImageStorage extends sequelize_1.Model {
    // Create custom class methods to create a new image
    static async createPost(attributes) {
        return await this.create(attributes);
    }
    // Create custom class methods to fetch an image by its ID
    static async getImageByID(ImageID) {
        return await this.findByPk(ImageID);
    }
    // Create custom class methods to fetch an image by its URL
    static async getImageByURL(ImageURL) {
        return await this.findOne({ where: { ImageURL } });
    }
}
// Define the User model
ImageStorage.init({
    ImageID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ImageURL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    NewPostID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    CreatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'ImageStorage',
    tableName: 'ImageStorage',
    timestamps: false
});
// Define the relationship between the User, NewPost, and ImageStorage models
ImageStorage.belongsTo(UserModel_1.default, { foreignKey: 'UserID' });
ImageStorage.belongsTo(NewPostModel_1.default, { foreignKey: 'NewPostID' });
exports.default = ImageStorage;
//# sourceMappingURL=ImageStorageModel.js.map