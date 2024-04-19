"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
require("dotenv/config");
const userMiddleware = async (req, res, next) => {
    try {
        // Extract the JWT token from the request headers
        const authHeader = req.headers.authorization;
        console.log('Received token:', authHeader);
        if (authHeader) {
            console.log('Token found:', authHeader);
            return res.status(401).send({ error: 'Unauthorized' });
        }
        const token = authHeader?.split(' ')[1];
        console.log('Received token:', token);
        if (!token) {
            return res.status(401).send({ error: 'JWT token is missing' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        const user = await UserModel_1.default.findByPk(decoded.UserID);
        console.log('User found:', user);
        if (user) {
            req.currentUser = { UserID: decoded.UserID };
        }
        else {
            console.error('user not found');
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }
        if (!user.refreshToken?.includes(token)) {
            console.error('Refresh Token does not match');
            return res.status(401).send({ error: 'Unauthorized' });
        }
        req.currentUser = { UserID: decoded.UserID };
        next();
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).send({ error: 'Unauthorized' });
        next(error);
    }
};
exports.userMiddleware = userMiddleware;
exports.default = exports.userMiddleware;
//# sourceMappingURL=userMiddleware.js.map