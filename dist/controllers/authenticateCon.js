"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getCurrentUser = exports.handleLogin = exports.registerUser = exports.generateToken = exports.handleError = void 0;
const UserRegistrationModel_1 = __importDefault(require("../utils/models/UserRegistrationModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
dotenv_1.default.config();
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
// const createToken = (UserID: number) => {
//     return jwt.sign({UserID}, 'metal ninja secret', as string, { expiresIn: maxAge})
// }
function generateToken(UserID) {
    const token = jsonwebtoken_1.default.sign({ UserID }, 'metal ninja secret', { expiresIn: maxAge });
    return token;
}
exports.generateToken = generateToken;
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
        const token = generateToken(user.UserID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user.UserID });
    }
    catch (error) {
        (0, exports.handleError)(error, res);
        console.log('Error creating new user:', error);
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
        const token = generateToken(user.UserID);
        const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
        const expires = new Date(Date.now() + maxAge * 1000);
        // Set cookies to local storage in browser
        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: true, maxAge: maxAge * 1000, expires });
        // set headers for the user
        res.setHeader('Authorization', `Bearer ${token}`);
        // add cookie to local storage
        res.locals.user = user;
        res.status(200).json({ token, user: user.UserID });
    }
    catch (error) {
        (0, exports.handleError)(error, res);
    }
};
exports.handleLogin = handleLogin;
// function to get current user
const getCurrentUser = async (req, res, next) => {
    const token = req.body || req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, 'metal ninja secret', async (err, decodedToken) => {
            console.log('decoded token:', decodedToken);
            if (err) {
                console.error(err.message);
                res.locals.user = null;
            }
            else {
                const user = await UserModel_1.default.findByPk(decodedToken.UserID);
                res.locals.user = user;
            }
        });
    }
    else {
        res.locals.user = null;
        res.status(200).json({ token, user: token.UserID });
        next();
    }
};
exports.getCurrentUser = getCurrentUser;
// function to logout user
const logoutUser = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
    res.status(200).json({ message: 'User logged out' });
};
exports.logoutUser = logoutUser;
exports.default = { registerUser: exports.registerUser, handleLogin: exports.handleLogin, getCurrentUser: exports.getCurrentUser, logoutUser: exports.logoutUser };
//# sourceMappingURL=authenticateCon.js.map