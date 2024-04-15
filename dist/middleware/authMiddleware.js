"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate requests
function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied - No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body = decoded;
        // add user to request object
        req.body.UserID = decoded.UserID;
        console.log('decoded', decoded);
        console.log('req.body', req.body.UserID);
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
exports.authenticate = authenticate;
exports.default = authenticate;
//# sourceMappingURL=authMiddleware.js.map