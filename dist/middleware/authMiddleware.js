"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRegistrationModel_1 = __importDefault(require("../utils/models/UserRegistrationModel"));
dotenv_1.default.config();
// Require authentication
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // Check if token exists
    if (token) {
        jsonwebtoken_1.default.verify(token, 'metal ninja secret', (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                res.redirect('/login');
            }
            else {
                const { UserID } = decodedToken; // Destructure UserID from decodedToken
                req.currentUser = { UserID }; // Assign UserID to req.currentUser
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.requireAuth = requireAuth;
// Check current user
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    // Check if token exists
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                res.locals.user = null;
                next();
            }
            else {
                try {
                    // Fetch the user object from the database based on the decoded user ID
                    const user = await UserRegistrationModel_1.default.findByPk(decodedToken.UserID);
                    // Set the user object to res.locals.user
                    res.locals.user = user;
                    next();
                }
                catch (error) {
                    console.error('Error fetching user:', error);
                    res.locals.user = null;
                    next();
                }
            }
        });
    }
    else {
        // If token does not exist, set res.locals.user to null
        res.locals.user = null;
        next();
    }
};
exports.checkUser = checkUser;
//# sourceMappingURL=authMiddleware.js.map