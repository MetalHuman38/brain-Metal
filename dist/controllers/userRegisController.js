"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUserToDatabase = exports.registerUser = void 0;
// userController.ts contains the controller functions for user registration and login.
const bcrypt_1 = __importDefault(require("bcrypt"));
const avatarUtils_1 = require("../utils/avatarUtils");
const UserRegistrationModel_1 = __importDefault(require("../utils/models/UserRegistrationModel"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
require("dotenv/config");
// Controller function to handle user registration
const registerUser = async (req, res) => {
    try {
        // Extract user data from request body
        const userData = req.body;
        if (!userData) {
            res.status(400).json({ message: 'Invalid user data' });
            return;
        }
        // Check for duplicate username in Database
        const duplicateUsername = await UserModel_1.default.findUsername(userData.username);
        if (duplicateUsername) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10); // Adjust the salt rounds as needed
        if (!hashedPassword) {
            res.status(400).json({ message: 'Error hashing password.' });
            return;
        }
        // Create a new user in the database
        const newAccount = await UserRegistrationModel_1.default.createUser(userData.name, userData.username, userData.email, hashedPassword);
        if (!newAccount) {
            res.status(400).json({ message: 'Error creating user account.' });
            return;
        }
        // Generate an avatar URL based on the user's name
        const avatarUrl = (0, avatarUtils_1.generateAvatarUrl)(userData.name);
        // Create a new user object
        const newUser = await SaveUserToDatabase({
            UserID: newAccount.UserID,
            MemberName: userData.name,
            Username: userData.username,
            Email: userData.email,
            hashedPassword: hashedPassword,
            Bio: null,
            Status: 'unverified',
            Join: new Date(),
            AvatarUrl: avatarUrl,
            ImageUrl: null,
            Label: null,
            LastActivity: null,
            UpdatedAt: new Date(),
            refreshToken: [""]
        });
        if (!newUser) {
            res.status(400).json({ message: 'Error creating user account.' });
            return newUser;
        }
        res.status(200).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.registerUser = registerUser;
// Function to save user data to the database
async function SaveUserToDatabase(user) {
    try {
        // Create a new user object
        const newUser = await UserModel_1.default.createUser({
            UserID: user.UserID,
            MemberName: user.MemberName,
            Username: user.Username,
            Email: user.Email,
            HashedPassword: user.hashedPassword,
            Status: user.Status,
            Bio: user.Bio || null,
            AvatarUrl: user.AvatarUrl,
            ImageURL: user.ImageUrl || null,
            Label: user.Label || null,
            Join: user.Join,
            Last_activity: user.LastActivity === null ? undefined : user.LastActivity,
            Updated_at: user.UpdatedAt,
            refreshToken: user.refreshToken
        });
        return newUser;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}
exports.SaveUserToDatabase = SaveUserToDatabase;
//# sourceMappingURL=userRegisController.js.map