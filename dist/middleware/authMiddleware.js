"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
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
// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    // Check if token exists
    if (token) {
        jsonwebtoken_1.default.verify(token, 'metal ninja secret', async (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                res.locals.user = null;
                next();
            }
            else {
                const user = await UserModel_1.default.findByPk(decodedToken.UserID);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
};
exports.default = { requireAuth, checkUser };
//# sourceMappingURL=authMiddleware.js.map