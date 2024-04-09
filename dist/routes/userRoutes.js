"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
// Define the route for user registration
router.post('/api/register', userController_1.registerUser);
// Define the route for user login with JWT authentication middleware
router.post('/api/login', userController_1.loginUser);
// Define the route for getting the current user with JWT authentication middleware
router.get('/api/getCurrentUser', authMiddleware_1.authenticate, userController_1.getCurrentUser);
// Define the route for user logout with JWT authentication middleware
router.post('/api/logoutUser', authMiddleware_1.authenticate, userController_1.logoutUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map