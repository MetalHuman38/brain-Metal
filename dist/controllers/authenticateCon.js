"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.handleCurrentUser = exports.handleLogin = exports.registerUser = exports.handleError = void 0;
const UserRegistrationModel_1 = __importDefault(require("../utils/models/UserRegistrationModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function hasErrors(err) {
    return err && typeof err.errors === 'object';
}
// Function to handle errors
const handleError = (err, res) => {
    console.error(err.message);
    // Initialize errors object
    let errors = {};
    // Handle specific errors cases
    if (err.message.includes('New User validation error')) {
        errors = {
            name: 'Name is required',
            username: 'Username is required',
            email: 'Email is required',
            password: 'Password is required',
        };
    }
    if (err.message.includes('UserRegistrations.Email')) {
        errors.email = 'Email is already registered';
    }
    if (err.message.includes('incorrect email')) {
        errors.email = 'Email is not registered';
    }
    if (err.message.includes('Incorrect password')) {
        errors.password = 'Password is incorrect';
    }
    // Handle Sequelize validation errors
    if (hasErrors(err)) {
        errors = err.errors.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
        }, {});
    }
    res.status(err.code || 500).json({ errors });
};
exports.handleError = handleError;
// Create Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (UserID) => {
    return jsonwebtoken_1.default.sign({ UserID }, 'metal ninja secret', { expiresIn: maxAge });
};
// Create a function to register new User
const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const user = await UserRegistrationModel_1.default.create({
            NewUser: name,
            Username: username,
            Email: email,
            HashedPassword: password,
        });
        const token = createToken(user.UserID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user.UserID });
    }
    catch (error) {
        (0, exports.handleError)(error, res);
        console.log('Error creating new user:', error);
        res.status(500).json({ message: 'cannot create a new user' });
    }
};
exports.registerUser = registerUser;
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserRegistrationModel_1.default.loginUser(email, password);
        if (!user) {
            throw new Error('incorrect email');
        }
        const token = createToken(user.UserID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user.UserID });
    }
    catch (error) {
        (0, exports.handleError)(error, res);
    }
};
exports.handleLogin = handleLogin;
// Function to get the current user
const handleCurrentUser = async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const currentUser = await UserRegistrationModel_1.default.findUserByEmail(user.UserID);
        if (!currentUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user: currentUser });
    }
    catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Error getting user' });
    }
};
exports.handleCurrentUser = handleCurrentUser;
// function to logout user
const logoutUser = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
    res.status(200).json({ message: 'User logged out' });
};
exports.logoutUser = logoutUser;
exports.default = { registerUser: exports.registerUser, handleLogin: exports.handleLogin, handleCurrentUser: exports.handleCurrentUser, logoutUser: exports.logoutUser };
//# sourceMappingURL=authenticateCon.js.map