"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userMiddleware = async (req, res, next) => {
    try {
        // Extract the JWT token from the request headers
        const token = req.headers.authorization?.split(' ')[1]; // Add a check for undefined
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, 'metal ninja secret');
            const user = await UserModel_1.default.findByPk(decoded.UserID);
            if (user) {
                req.currentUser = user;
            }
            else {
                console.error('user not found');
                res.status(401).send({ error: 'Unauthorized' });
                return;
            }
        }
        next();
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).send({ error: 'Unauthorized' });
        next(error);
    }
};
exports.userMiddleware = userMiddleware;
//# sourceMappingURL=userMiddleware.js.map