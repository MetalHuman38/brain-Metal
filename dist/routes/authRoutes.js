"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
// Define the route for generating JWT tokens (e.g., user login)
router.post('/api/generateToken', (req, res) => {
    // Extract the user ID from the request body
    const { UserID } = req.body;
    // Generate a JWT token
    const token = authController_1.default.generateToken(UserID);
    // Send the token in the response
    res.status(200).json({ token });
});
// Define the route for verifying JWT tokens (e.g., user authentication)
router.post('/api/verifyToken', (req, res) => {
    // Extract the token from the request body
    const { token } = req.body;
    // Verify the token
    const decoded = authController_1.default.verifyToken(token);
    // Send the decoded token in the response
    res.status(200).json({ decoded });
});
// Define the route for clearing JWT tokens (e.g., user logout)
router.post('/api/clearToken', (req, res) => {
    // Clear the JWT token
    authController_1.default.clearToken();
    // Send a success response
    res.status(200).json({ message: 'Token cleared' });
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map