"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getCurrentUser = exports.loginUser = void 0;
// userController.ts contains the controller functions for user registration and login.
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController_1 = require("./authController");
const authController_2 = require("./authController");
// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('email', email);
        console.log(req.body);
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
        const accessToken = (0, authController_1.generateToken)(user.UserID); // Issue token for the logged in user
        const refresh = (0, authController_2.refreshToken)(user.UserID);
        // Create a object to store the token in the database
        const saveToken = async (UserID, refreshToken) => {
            const user = await UserModel_1.default.findByPk(UserID);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            user.refreshToken = [refreshToken];
            await user.save();
        };
        await saveToken(user.UserID, refresh);
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
        res.cookie('refreshToken', refresh, { httpOnly: true, secure: true, sameSite: 'none' });
        const tokenResponse = {
            accessToken,
            refreshToken: refresh,
            user: {
                UserID: user.UserID,
                MemberName: user.MemberName,
                Username: user.Username,
                Email: user.Email,
                ImageUrl: user.ImageURL,
                AvatarUrl: user.AvatarUrl,
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
async function getCurrentUser(req, res) {
    try {
        const token = req.cookies.accessToken;
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
        const user = await UserModel_1.default.findByPk(UserID);
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