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
router.post('/api/generateToken', authController_1.default.generateToken);
// Define the route for verifying JWT tokens (e.g., user authentication)
router.post('/api/verifyToken', authController_1.default.verifyToken);
// Define the route for refreshing JWT tokens (e.g., user refresh token)
router.post('/api/refreshToken', authController_1.default.refreshToken);
// Define the route for clearing JWT tokens (e.g., user logout)
router.post('/api/clearToken', authController_1.default.clearToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map