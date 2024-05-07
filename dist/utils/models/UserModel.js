"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
const PostModels_1 = __importDefault(require("./PostModels"));
const CommentsModel_1 = __importDefault(require("./CommentsModel"));
const UserRegistrationModel_1 = __importDefault(require("./UserRegistrationModel"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Users extends sequelize_1.Model {
    static async createUser(userData) {
        return await this.create(userData);
    }
    static async findByEmail(email) {
        return await this.findOne({ where: { Email: email } });
    }
    // Create custom class method to find Image URL
    static async findImageURL(ImageURL) {
        return await this.findOne({ where: { ImageURL: ImageURL } });
    }
    // Create custom class method to detect duplicate username
    static async findUsername(Username) {
        return await this.findOne({ where: { Username: Username } });
    }
    // Static method to provide userRegistration attributes
    static async findUserRegistration(UserID) {
        return await UserRegistrationModel_1.default.findByPk(UserID);
    }
    // Static method to find user by primary key
    static async findUser(UserID) {
        return await Users.findOne({ where: { UserID: UserID } });
    }
    // Static method to find user by primary key
    static async findByPk(UserID) {
        return await Users.findOne({ where: { UserID: UserID } });
    }
    static async currentUser(UserID) {
        try {
            return await Users.findOne({ where: { UserID: UserID } });
        }
        catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
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
    FirstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
Users.afterCreate(async (user, options) => {
    try {
        console.log('User created:', user);
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
});
Users.currentUser = async function (UserID) {
    try {
        const user = await Users.findOne({ where: { UserID } });
        console.log('User:', user); // Log the user object
        return user; // Return the user object if found
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};
Users.hasMany(CommentsModel_1.default, { foreignKey: 'UserID', as: 'comments' });
PostModels_1.default.belongsTo(Users, { foreignKey: 'PostID', as: 'creator' });
exports.default = Users;
//# sourceMappingURL=UserModel.js.map