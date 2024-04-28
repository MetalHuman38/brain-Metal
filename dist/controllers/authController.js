"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearToken = exports.refreshToken = exports.getTokenCurrentUser = exports.verifyToken = exports.generateToken = void 0;
// authController.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const maxAge = 3 * 24 * 60 * 60;
// Function to generate JWT token
function generateToken(UserID) {
    const token = jsonwebtoken_1.default.sign({ UserID }, process.env.JWT_SECRET, { expiresIn: maxAge });
    return token;
}
exports.generateToken = generateToken;
function verifyToken(token) {
    if (!token) {
        return { error: 'Token is required' };
    }
    else if (token === 'null') {
        return { error: 'Token is null' };
    }
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
}
exports.verifyToken = verifyToken;
function getTokenCurrentUser(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
}
exports.getTokenCurrentUser = getTokenCurrentUser;
// Function to refresh JWT token
function refreshToken(UserID) {
    const token = jsonwebtoken_1.default.sign({ UserID }, process.env.JWT_SECRET, { expiresIn: maxAge });
    return token;
}
exports.refreshToken = refreshToken;
// Function to clear JWT token (called when user logs out)
function clearToken() {
    localStorage.removeItem('token');
}
exports.clearToken = clearToken;
exports.default = { generateToken,
    verifyToken,
    clearToken,
    getTokenCurrentUser
};
//# sourceMappingURL=authController.js.map