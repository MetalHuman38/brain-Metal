"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const sequelizeCon_1 = require("./sequelizeCon");
const UserModel_1 = __importDefault(require("./UserModel"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class UserRegistrations extends sequelize_1.Model {
    // Define custom class methods
    static async createUser(name, username, email, password) {
        return await this.create({ NewUser: name, Username: username, Email: email, HashedPassword: password });
    }
}
// Define the User model
UserRegistrations.init({
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NewUser: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 50],
            notEmpty: true,
        }
    },
    Username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: true,
            len: [3, 20]
        }
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [5, 50],
            isIP: true,
            isIPv6: true,
            notEmpty: true,
        }
    },
    HashedPassword: {
        type: sequelize_1.DataTypes.STRING(64),
        allowNull: false,
    },
    Created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    Updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize: sequelize,
    tableName: 'UserRegistrations',
    timestamps: true,
    updatedAt: 'Updated_at',
    createdAt: 'Created_at',
});
UserRegistrations.hasOne(UserModel_1.default, { foreignKey: 'UserID', as: 'user' });
UserModel_1.default.belongsTo(UserRegistrations, { foreignKey: 'UserID', as: 'registration' });
exports.default = UserRegistrations;
//# sourceMappingURL=UserRegistrationModel.js.map