"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAvatarUrl = exports.generateHash = void 0;
// Import necessary modules
const crypto_1 = __importDefault(require("crypto"));
// Function to generate a hash from a string
function generateHash(str) {
    return crypto_1.default.createHash('md5').update(str).digest('hex');
}
exports.generateHash = generateHash;
// Function to generate an avatar URL based on user initials
function generateAvatarUrl(name) {
    // Extract the initials from the user's name
    const initials = name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('');
    // Generate a hash from the initials
    const hash = generateHash(initials);
    // Construct the avatar URL
    const baseUrl = 'https://www.gravatar.com/avatar/';
    const size = 200; // Specify the desired size of the avatar
    return `${baseUrl}${hash}?s=${size}&d=identicon`;
}
exports.generateAvatarUrl = generateAvatarUrl;
// Example usage
const userName = 'John Doe';
const avatarUrl = generateAvatarUrl(userName);
console.log(avatarUrl); // Output: "https://www.gravatar.com/avatar/<hash>?s=200&d=identicon"
//# sourceMappingURL=avatarUtils.js.map