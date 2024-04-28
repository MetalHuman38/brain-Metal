"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const sequelizeCon_1 = require("./sequelizeCon");
const UserModel_1 = __importDefault(require("./UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class UserRegistrations extends sequelize_1.Model {
    // Define custom class methods
    static async createUser(name, username, email, password) {
        return await this.create({ NewUser: name, Username: username, Email: email, HashedPassword: password });
    }
    // Create a customer class that uses promise to save a new user to user.json file
    static async saveUserToDatabase(user) {
        return await this.create(user);
    }
    // Create a static method to log in user upon successful registration
    static async loginUser(username, password) {
        return await this.findOne({ where: { Username: username, HashedPassword: password } });
    }
    // Create a static method to find a user by email
    static async findUserByEmail(email) {
        return await this.findOne({ where: { Email: email } });
    }
    // Create a static method to find a user by ID
    static async findUserById(id) {
        return await this.findByPk(id);
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
UserRegistrations.beforeCreate(async (user) => {
    try {
        if (user) {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = await bcrypt_1.default.hash(String(user.HashedPassword), salt);
            user.HashedPassword = hashedPassword;
        }
    }
    catch (error) {
        console.error('Error before creating user:', error);
        throw new Error('Error before creating user');
        // If an error occurs during the pre-processing, you can choose to handle it or throw it
    }
});
// Define a custom class method to log in a user
UserRegistrations.loginUser = async function (email, password) {
    try {
        const user = await this.findOne({ where: { Email: email } });
        if (user) {
            const auth = await bcrypt_1.default.compare(password, user.HashedPassword);
            if (auth) {
                return user;
            }
            else {
                throw new Error('Incorrect password');
            }
        }
        else {
            throw new Error('Incorrect email');
        }
    }
    catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('User not found');
    }
};
// Define a custom class method to log in a user
UserRegistrations.findUserByEmail = async function (email) {
    try {
        return await this.findOne({ where: { Email: email } });
    }
    catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Error finding user by email');
    }
};
UserRegistrations.hasOne(UserModel_1.default, { foreignKey: 'UserID', as: 'user' });
UserModel_1.default.belongsTo(UserRegistrations, { foreignKey: 'UserID', as: 'registration' });
sequelize.sync()
    .then(() => {
    console.log('New registration synced successfully');
}).catch(err => {
    console.error('Error syncing new user:', err);
});
exports.default = UserRegistrations;
//# sourceMappingURL=UserRegistrationModel.js.map