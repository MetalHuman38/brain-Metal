"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
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
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
}
exports.verifyToken = verifyToken;
exports.default = { generateToken, verifyToken };
//# sourceMappingURL=authController.js.map