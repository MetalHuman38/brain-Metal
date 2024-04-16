"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
// Define the route for generating JWT tokens (e.g., user login)
router.post('/api/generateToken', authController_1.default.generateToken);
// Define the route for verifying JWT tokens (e.g., user authentication)
router.post('/api/verifyToken', authController_1.default.verifyToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map