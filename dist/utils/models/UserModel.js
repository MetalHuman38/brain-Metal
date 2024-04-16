"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
const PostModels_1 = __importDefault(require("./PostModels"));
const CommentsModel_1 = __importDefault(require("./CommentsModel"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Users extends sequelize_1.Model {
    static async createUser(userData) {
        return await this.create(userData);
    }
    static async findByEmail(email) {
        return await this.findOne({ where: { Email: email } });
    }
    static async findByUserId(UserID) {
        return await this.findByPk(UserID);
    }
}
// Define the User model
Users.init({
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    MemberName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    HashedPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Bio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Join: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    Label: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Last_activity: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    Updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    ImageURL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    AvatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'Users',
    updatedAt: 'Updated_at',
    createdAt: 'Join',
    timestamps: false
});
// Define associations
Users.hasMany(PostModels_1.default, { foreignKey: 'PostID', as: 'post' });
Users.hasMany(CommentsModel_1.default, { foreignKey: 'UserID', as: 'comments' });
PostModels_1.default.belongsTo(Users, { foreignKey: 'PostID', as: 'creator' });
exports.default = Users;
//# sourceMappingURL=UserModel.js.map