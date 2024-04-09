"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getCurrentUser = exports.loginUser = exports.SaveUserToDatabase = exports.registerUser = void 0;
// userController.ts contains the controller functions for user registration and login.
const bcrypt_1 = __importDefault(require("bcrypt"));
const avatarUtils_1 = require("../utils/avatarUtils");
const UserRegistrationModel_1 = __importDefault(require("../utils/models/UserRegistrationModel"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController_1 = require("./authController");
// Controller function to handle user registration
const registerUser = async (req, res) => {
    try {
        // Extract user data from request body
        const userData = req.body; // Extract user data from request body
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
        });
        return newUser;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}
exports.SaveUserToDatabase = SaveUserToDatabase;
// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await UserModel_1.default.findByEmail(email);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Validate password
        const passwordMatch = await bcrypt_1.default.compare(password, user.HashedPassword);
        // Perform password validation (you would typically use a password hashing library here)
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        // Generate JWT token for the user
        const token = (0, authController_1.generateToken)(user.UserID); // Issue token for the logged in user
        res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'none' });
        const tokenResponse = {
            token,
            user: {
                UserID: user.UserID,
                MemberName: user.MemberName,
                Username: user.Username,
                Email: user.Email,
                ImageUrl: user.ImageURL,
                Bio: user.Bio || '',
            },
        };
        res.status(200).json({ message: 'User logged in successfully', tokenResponse });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.loginUser = loginUser;
function getCurrentUser(req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthrized: No Token provided' });
            return;
        }
        ;
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            res.status(401).json({ message: 'Unauthrized: Invalid Token' });
            return;
        }
        const UserID = verified.user.UserID;
        const user = UserModel_1.default.findByUserId(UserID);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getCurrentUser = getCurrentUser;
;
// Controller function to handle user logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=userController.js.map