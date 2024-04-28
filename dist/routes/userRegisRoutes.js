"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegisController_1 = require("../controllers/userRegisController");
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
// Define the route for user registration
router.post('/api/register', userRegisController_1.registerUser);
exports.default = router;
//# sourceMappingURL=userRegisRoutes.js.map